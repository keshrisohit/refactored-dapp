import React from "react";
import { withStyles } from "@material-ui/styles";

import AlertBox from "../../../../../common/AlertBox";
import StyledButton from "../../../../../common/StyledButton";
import { useStyles } from "./styles";

const ExpiredSession = ({ classes, handleComplete }) => {
  return (
    <div className={classes.ExpiredSessionContainer}>
      <AlertBox
        type="warning"
        message="You have used all your free quota for this service.  Please add a payment method to continue using this service. To know more about adding credits to your acount "
        link="Click here"
      />
      <StyledButton type="blue" btnText="add payment" onClick={handleComplete} />
    </div>
  );
};

export default withStyles(useStyles)(ExpiredSession);
