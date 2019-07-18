import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import Price from "./Price";

const PricingDetails = ({ classes, price_model, price_strategy }) => {
  const priceInAGI = typeof price_strategy === "undefined" ? undefined : price_strategy.getMaxPriceInAGI();
  return (
    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.creditsContainer}>
      <div className={classes.creditsAndToken}>
        <Price unit="credits" value="1" />
        <span>=</span>
        <Price unit="agi tokens" value={priceInAGI} />
      </div>
      <p>
        <Icon className="fas fa-info-circle" />
        <span>{price_model}</span>
      </p>
      <StyledButton btnText="demo" />
    </Grid>
  );
};

export default withStyles(useStyles)(PricingDetails);
