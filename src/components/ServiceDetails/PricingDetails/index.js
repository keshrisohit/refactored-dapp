import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";

import StyledButton from "../../common/StyledButton";
import { useStyles } from "./styles";
import Price from "./Price";

const PricingDetails = ({ classes, price_strategy }) => {
  const priceInAGI = typeof price_strategy === "undefined" ? undefined : price_strategy.getMaxPriceInAGI();
  const price_model = typeof price_strategy === "undefined" ? undefined : price_strategy.getPriceModel();
  const handleClick = () => {
    window.scroll({
      top: 520,
      behavior: "smooth",
    });
  };

  return (
    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.creditsContainer}>
      <div className={classes.creditsAndToken}>
        <Price unit="credits" value="1" />
        <span>=</span>
        <Price unit="agi tokens" value={priceInAGI} />
      </div>
      <p>
        <InfoIcon className={classes.infoIcon} />
        <span>{price_model}</span>
      </p>
      <StyledButton btnText="demo" onClick={handleClick} />
    </Grid>
  );
};

export default withStyles(useStyles)(PricingDetails);
