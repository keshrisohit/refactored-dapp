export const useStyles = theme => ({
  aboutContainer: {
    paddingBottom: 100,
    marginTop: 15,
    "& h3": {
      padding: "11px 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
    },
  },
  leftSideSection: { paddingRight: 25 },
  overViewContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.text.white,
    borderRadius: 4,
    paddingBottom: 30,
    "& p": {
      padding: "15px 22px 0",
      margin: 0,
      fontSize: 14,
      color: theme.palette.text.mediumShadeGray,
      fontFamily: theme.typography.secondary.main,
      letterSpacing: "0.25px",
      lineHeight: "20px",
    },
    "& h4": {
      paddingLeft: 22,
      margin: "30px 0 0",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 18,
    },
    "& ul": {
      margin: "20px 0 0",
      padding: "0 22px",
      display: "flex",
      "& div": {
        "&:last-of-type": { marginLeft: "26%" },
      },
      "& li": {
        display: "flex",
        color: theme.palette.text.mediumShadeGray,
        fontFamily: theme.typography.secondary.main,
        fontSize: 14,
        lineHeight: "24px",
        letterSpacing: "0.25px",
        listStyle: "none",
      },
    },
    "& h5": {
      paddingLeft: 22,
      margin: "40px 45px 0 0",
      display: "inline-block",
      color: theme.palette.text.lightShadedGray,
      fontSize: 16,
    },
  },
  tags: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.lightGray,
    borderRadius: 16,
    padding: "5px 15px",
    marginRight: 5,
    display: "inline-block",
    color: theme.palette.text.lightShadedGray,
    fontSize: 12,
    letterSpacing: "0.21px",
    lineHeight: "20px",
    "&:last-of-type": { marginRight: 0 },
  },
  demoContainer: {
    marginTop: 25,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    "& > div": {
      padding: "43px 0",
      textAlign: "center",
      "& button": {
        "&:first-of-type": { marginRight: 70 },
      },
    },
  },
  backToLink: {
    marginTop: 30,
    "& span": {
      color: theme.palette.text.primary,
      verticalAlign: "bottom",
    },
    "& a": {
      marginLeft: 11,
      color: theme.palette.text.primary,
      textDecoration: "none",
      fontSize: 16,
      "&:hover": { fontWeight: 600 },
    },
  },
  creatorDetailsContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
  },
  companyInfo: {
    paddingLeft: 22,
    margin: "10px 0 20px",
    display: "flex",
    alignItems: "center",
  },
  companyName: {
    paddingLeft: 20,
    "& h4": {
      margin: 0,
      color: theme.palette.text.primary,
      fontSize: 18,
      letterSpacing: "0.23px",
      lineHeight: "24px",
    },
    "& span": {
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
    },
  },
  iconContainer: {
    padding: "17px 0",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.lightGray,
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: theme.palette.text.cardBackground,
    "& i": {
      color: theme.palette.text.iconColor,
      verticalAlign: "bottom",
    },
    "& span": {
      marginLeft: 8,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 12,
    },
  },
  projectDetailsContainer: {
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    padding: "0 25px 30px 0",
    borderRadius: 4,
    marginTop: 30,
    backgroundColor: theme.palette.text.white,
    "& h3": { marginBottom: 15 },
    "& > div": {
      paddingLeft: 30,
      marginBottom: 30,
      display: "flex",
      "& h5": {
        width: 150,
        margin: 0,
        color: theme.palette.text.darkShadedGray,
        fontSize: 16,
        lineHeight: "22px",
      },
      "& div": { marginLeft: 20 },
      "& a": {
        display: "block",
        color: theme.palette.text.primary,
        fontSize: 14,
        fontFamily: theme.typography.secondary.main,
        fontWeight: 600,
        textDecoration: "none",
      },
      "& p": {
        margin: 0,
        color: theme.palette.text.mediumShadeGray,
        fontSize: 14,
      },
      "&:last-of-type": { marginBottom: 0 },
    },
  },
  contributors: {
    "& p": { marginLeft: "30px !important" },
  },
  demoToggler: {
    "& a": { textDecoration: "none !important" },
  },
});
