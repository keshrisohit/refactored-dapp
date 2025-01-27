import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  Modal: { overflow: "auto" },
  card: {
    width: 519,
    margin: "0px auto 80px	",
    transform: "translateY(25%)",
  },
  CardHeader: {
    padding: "5px 22px",
    backgroundColor: theme.palette.text.offWhiteColor,
    "& h2": {
      color: theme.palette.text.black1,
      fontFamily: theme.typography.tertiary.main,
      fontSize: 20,
      lineHeight: "24px",
      fontWeight: 600,
    },
  },
  CardContent: {
    padding: "16px 32px 0",
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 18,
      lineHeight: "24px",
    },
    "& p": {
      margin: "16px 0 0",
      color: theme.palette.text.mediumShadeGray,
      fontFamily: theme.typography.secondary.main,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
  },
  CardActions: { justifyContent: "center" },
  BeforeYouGoContent: { marginTop: 16 },
  DropDownContainer: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#828282",
    borderRadius: 4,
    position: "relative",
    marginTop: 25,
    padding: "11px 15px",
    "& span": {
      color: "#212121",
      fontSize: 12,
      lineHeight: "16px",
      letterSpacing: 0.4,
      position: "absolute",
      top: -10,
      left: 10,
      background: "#fff",
      display: "inline-block",
      padding: "0 5px",
      "& + div": { width: "100%" },
    },
    "& select": {
      padding: "initial",
      color: "#212121",
    },
  },
  WarningBoxConatiner: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F18D5A",
    backgroundColor: "#FDF3E5",
    borderRadius: 4,
    marginTop: 16,
    padding: "13px 20px",
    "& p": {
      border: "none",
      margin: "0 0 12",
      padding: 0,
      display: "inline",
      "&:last-of-type": { marginBottom: 0 },
    },
    "& svg": {
      color: "#FFC200",
      marginRight: 12,
      verticalAlign: "middle",
    },
  },
}));
