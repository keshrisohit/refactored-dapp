import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import Authentication from "./Authentication";
import TermsOfUse from "./TermsOfUse";
import WalletKey from "./WalletKey";
import { useStyles } from "./styles";
import OnboardingContainer from "./OnboardingContainer";
import { userActions } from "../../Redux/actionCreators";
import Routes from "../../utility/constants/Routes";

class Onboarding extends Component {
  state = {
    verificationCode: "",
    activeSection: 2,
    progressText: ["Authentication", "Terms of service", "Wallet Key Generator"],
  };

  componentDidMount = () => {
    const { checkWalletStatus, username, isWalletAssigned, isEmailVerified, history } = this.props;
    checkWalletStatus(username);
    if (isWalletAssigned) {
      history.push(`/${Routes.AI_MARKETPLACE}`);
    }
    if (isEmailVerified) {
      this.setState({ activeSection: 2 });
    }
  };

  componentDidUpdate = () => {
    const { checkWalletStatus, username, isWalletAssigned, isEmailVerified, history } = this.props;
    checkWalletStatus(username);
    if (isWalletAssigned) {
      history.push(Routes.AI_MARKETPLACE);
    }
    if (isEmailVerified && this.state.activeSection === 1) {
      this.setState({ activeSection: 2 });
    }
  };

  handleNextSection = () => {
    this.setState(prevState => ({
      activeSection: prevState.activeSection + 1,
    }));
  };

  render() {
    const { classes, username, enforcedWalletCreation } = this.props;
    const { activeSection, progressText } = this.state;

    const OnboardingDetails = [
      {
        title: `Welcome ${username}`,
        description: (
          <p>
            You have successfully logged into your singularitynet account. <br />
            You are just steps away from completing your activation.
          </p>
        ),
        component: <Authentication handleNextSection={this.handleNextSection} />,
      },
      {
        title: `Step 2. Privacy and Terms of Service`,
        description: <p>Just one more step and you’ll be all set!</p>,
        component: <TermsOfUse handleNextSection={this.handleNextSection} />,
      },
      {
        title: `Step 3. Creating Your Account Wallet`,
        description: <p>Final step!</p>,
        component: <WalletKey enforcedWalletCreation={enforcedWalletCreation} />,
      },
    ];

    return (
      <div className={classes.onboardingContainer}>
        {OnboardingDetails.map((item, index) => (
          <OnboardingContainer
            key={item.title}
            classes={classes}
            item={item}
            active={activeSection === index + 1}
            activeSection={activeSection}
            progressText={progressText}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isEmailVerified: state.userReducer.isEmailVerified,
  isWalletAssigned: state.userReducer.isWalletAssigned,
  username: state.userReducer.username,
});

const mapDispatchToProps = dispatch => ({
  checkWalletStatus: username => dispatch(userActions.checkWalletStatus(username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Onboarding));
