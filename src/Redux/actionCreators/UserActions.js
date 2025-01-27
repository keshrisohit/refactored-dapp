import { Auth, API } from "aws-amplify";

import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { parseError } from "../../utility/ErrorHandling";
import { userActions, errorActions, loaderActions } from ".";
import { LoaderContent } from "../../utility/constants/LoaderContent";
import { initializeAPIOptions } from "../../utility/API";

export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGN_OUT = "SIGN_OUT";
export const CHECK_WALLET_STATUS = "CHECK_WALLET_STATUS";
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_EMAIL_VERIFIED = "UPDATE_EMAIL_VERIFIED";
export const SUBSCRIBE_TO_EMAIL_ALERTS = "SUBSCRIBE_TO_EMAIL_ALERTS";
export const UNSUBSCRIBE_TO_EMAIL_ALERTS = "UNSUBSCRIBE_TO_EMAIL_ALERTS";
export const WALLET_CREATION_SUCCESS = "WALLET_CREATION_SUCCESS";
export const APP_INITIALIZATION_SUCCESS = "APP_INITIALIZATION_SUCCESS";

export const fetchAuthenticatedUser = async () => {
  const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  return {
    username: currentUser.username,
    email: currentUser.attributes.email,
    email_verified: currentUser.attributes.email_verified,
    token: currentUser.signInUserSession.idToken.jwtToken,
  };
};

export const appInitializationSuccess = dispatch => {
  dispatch({ type: APP_INITIALIZATION_SUCCESS, payload: { isInitialized: true } });
};

export const updateUsername = username => dispatch => {
  dispatch({ type: UPDATE_USERNAME, payload: { username } });
};

export const updateEmailVerified = value => dispatch => {
  dispatch({ type: UPDATE_EMAIL_VERIFIED, payload: { isEmailVerified: value } });
};

export const subscribeToEmailAlerts = dispatch => {
  dispatch({ type: SUBSCRIBE_TO_EMAIL_ALERTS });
};

export const unsubsrcibeToEmailAlerts = dispatch => {
  dispatch({ type: UNSUBSCRIBE_TO_EMAIL_ALERTS });
};

export const fetchUserProfile = (username, token) => dispatch => {
  const apiName = APIEndpoints.USER.name;
  const path = APIPaths.GET_USER_PROFILE;
  const apiOptions = initializeAPIOptions(token);
  API.get(apiName, path, apiOptions).then(res => {
    if (res.data.data.length > 0 && Boolean(res.data.data[0].email_alerts)) {
      dispatch(subscribeToEmailAlerts);
    }
  });
};

const fetchWalletStatus = (username, token) => {
  const apiName = APIEndpoints.USER.name;
  const path = `${APIPaths.WALLET}`;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, path, apiOptions);
};

const noAuthenticatedUser = dispatch => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: {
      login: { isLoggedIn: false, error: undefined, loading: false },
      isInitialized: true,
    },
  });
};

const fetchUserDetailsSuccess = (isEmailVerified, email, username, isWalletAssigned) => dispatch => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: {
      login: { isLoggedIn: true, error: undefined, loading: false },
      isInitialized: true,
      isEmailVerified,
      email,
      username,
      isWalletAssigned,
    },
  });
};

const fetchUserDetailsError = err => dispatch => {
  if (err === "No current user") {
    dispatch(noAuthenticatedUser);
  }
  dispatch(appInitializationSuccess);
};

export const fetchUserDetails = async dispatch => {
  try {
    const { username, token, email, email_verified } = await fetchAuthenticatedUser();
    const wallet = await fetchWalletStatus(username, token);
    dispatch(fetchUserProfile(username, token));
    if (username === null || username === undefined) {
      dispatch(noAuthenticatedUser);
      return;
    }
    if (email_verified) {
      dispatch(fetchUserDetailsSuccess(email_verified, email, username, wallet.data.length > 0));
    }
  } catch (err) {
    dispatch(fetchUserDetailsError(err));
  }
};

export const updateUserProfileInit = (token, updatedUserData) => {
  const apiName = APIEndpoints.USER.name;
  const path = APIPaths.UPDATE_USER_PROFILE;
  const apiOptions = initializeAPIOptions(token, updatedUserData);
  return API.post(apiName, path, apiOptions);
};

const updateUserProfileSuccess = updatedUserData => dispatch => {
  if (updatedUserData.email_alerts) {
    dispatch(subscribeToEmailAlerts);
  } else {
    dispatch(unsubsrcibeToEmailAlerts);
  }
  dispatch(loaderActions.stopAppLoader);
};

const updateUserProfileFailure = err => dispatch => {
  dispatch(errorActions.updateProfileSettingsError(String(err)));
  dispatch(loaderActions.stopAppLoader);
};

export const updateUserProfile = updatedUserData => async dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.UPDATE_PROFILE));
  try {
    const { token } = await fetchAuthenticatedUser();
    const response = await updateUserProfileInit(token, updatedUserData);
    if (response.status === "success") {
      return dispatch(updateUserProfileSuccess(updatedUserData));
    }
  } catch (err) {
    dispatch(updateUserProfileFailure(err));
    throw err;
  }
};

export const loginSuccess = ({ res, history, route, wallet }) => dispatch => {
  const userDetails = {
    type: userActions.LOGIN_SUCCESS,
    payload: {
      login: { isLoggedIn: true },
      isWalletAssigned: wallet.data.length > 0,
      username: res.attributes.name,
      isEmailVerified: res.attributes.email_verified,
    },
  };
  dispatch(userDetails);
  history.push(route);
};

export const login = ({ username, password, history, route }) => async dispatch => {
  dispatch({ type: LOGIN_LOADING });
  let userDetails = {};
  return Auth.signIn(username, password)
    .then(async res => {
      const wallet = await fetchWalletStatus(res.username, res.signInUserSession.idToken.jwtToken);
      dispatch(loginSuccess({ res, history, route, wallet }));
    })
    .catch(err => {
      if (err.code === "UserNotConfirmedException") {
        dispatch(updateUsername(username));
        userDetails = {
          type: userActions.LOGIN_SUCCESS,
          payload: { login: { isLoggedIn: true } },
        };
        dispatch(userDetails);
        loginSuccess({ history, route });
        return;
      }
      const error = parseError(err);
      userDetails = {
        type: userActions.LOGIN_ERROR,
        payload: { login: { error } },
      };
      dispatch(userDetails);
      throw err;
    });
};

const registrationAPI = token => {
  const apiName = APIEndpoints.USER.name;
  const apiPath = APIPaths.SIGNUP;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

export const registerInMarketplace = async dispatch => {
  const { token } = await fetchAuthenticatedUser();
  return registrationAPI(token);
};

export const signOut = dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.SIGN_OUT));
  let userDetails = {
    type: SIGN_OUT,
    payload: {
      login: {
        isLoggedIn: true,
        error: undefined,
        loading: true,
      },
    },
  };
  Auth.signOut()
    .then(() => {
      userDetails.payload.login = {
        isLoggedIn: false,
        error: undefined,
        loading: false,
      };
    })
    .finally(() => {
      dispatch(userDetails);
      dispatch(loaderActions.stopAppLoader);
    });
};

export const walletCreationSuccess = dispatch => {
  dispatch({ type: WALLET_CREATION_SUCCESS, payload: { isWalletAssigned: true } });
};

export const checkWalletStatus = username => (dispatch, getState) => {
  Auth.currentSession({ bypassCache: true })
    .then(currentSession => {
      const apiName = APIEndpoints.USER.name;
      const path = `${APIPaths.WALLET}`;
      const apiOptions = initializeAPIOptions(currentSession.idToken.jwtToken);
      dispatch(updateEmailVerified(currentSession.idToken.payload.email_verified));
      API.get(apiName, path, apiOptions).then(res => {
        dispatch({
          type: CHECK_WALLET_STATUS,
          payload: { isWalletAssigned: res.data.length > 0 },
        });
      });
    })
    .catch(err => {
      if (err === "No current user") {
        dispatch({
          type: CHECK_WALLET_STATUS,
          payload: { login: { ...getState().userReducer.login, isLoggedIn: false } },
        });
      }
    });
};

const userDeleted = ({ history, route }) => dispatch => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: {
      login: {
        isLoggedIn: false,
      },
      isEmailVerified: false,
      isWalletAssigned: false,
      email: "",
    },
  });
  history.push(route);
};

const deleteUserFromMarketPlace = token => {
  const apiName = APIEndpoints.USER.name;
  const path = APIPaths.DELETE_USER;
  const apiOptions = {
    headers: { Authorization: token },
  };
  return API.get(apiName, path, apiOptions);
};

const deleteUserFromCognito = (user, { history, route }) => dispatch => {
  new Promise((resolve, reject) => {
    user.deleteUser(error => {
      if (error) {
        reject(error);
        dispatch(loaderActions.stopAppLoader);
      }
      resolve();
    });
  }).then(() => {
    dispatch(userDeleted({ history, route }));
    dispatch(loaderActions.stopAppLoader);
  });
};

export const deleteUserAccount = ({ history, route }) => async dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.DELETE_USER));
  const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  await deleteUserFromMarketPlace(currentUser.signInUserSession.idToken.jwtToken);
  dispatch(deleteUserFromCognito(currentUser, { history, route }));
};

const forgotPasswordInit = dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD));
  dispatch(errorActions.resetForgotPasswordError);
};

const forgotPasswordSuccessfull = ({ username, history, route }) => dispatch => {
  dispatch(updateUsername(username));
  dispatch(loaderActions.stopAppLoader);
  history.push(route);
};

const forgotPasswordFailure = error => dispatch => {
  dispatch(errorActions.updateForgotPasswordError(error));
  dispatch(loaderActions.stopAppLoader);
};

export const forgotPassword = ({ username, history, route }) => dispatch => {
  dispatch(forgotPasswordInit);
  Auth.forgotPassword(username)
    .then(() => {
      dispatch(forgotPasswordSuccessfull({ history, route }));
    })
    .catch(err => {
      dispatch(forgotPasswordFailure(err.message));
    });
};

const forgotPasswordSubmitInit = dispatch => {
  dispatch(loaderActions.startAppLoader(LoaderContent.FORGOT_PASSWORD_SUBMIT));
  dispatch(errorActions.resetForgotPasswordSubmitError);
};

const forgotPasswordSubmitSuccessfull = ({ username, history, route }) => dispatch => {
  dispatch(updateUsername(username));
  dispatch(loaderActions.stopAppLoader);
  history.push(route);
};

const forgotPasswordSubmitFailure = error => dispatch => {
  dispatch(errorActions.updateForgotPasswordSubmitError(error));
  dispatch(loaderActions.stopAppLoader);
};

export const forgotPasswordSubmit = ({ username, code, password, history, route }) => dispatch => {
  dispatch(forgotPasswordSubmitInit);
  Auth.forgotPasswordSubmit(username, code, password)
    .then(() => {
      dispatch(forgotPasswordSubmitSuccessfull({ username, history, route }));
    })
    .catch(err => {
      dispatch(forgotPasswordSubmitFailure(err.message));
    });
};
