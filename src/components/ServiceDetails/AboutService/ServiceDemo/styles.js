export const useStyles = theme => ({
  demoExampleContainer: {
    padding: "0 22px !important",
    textAlign: "left !important",
    "& h4": {
      margin: "16px 0 0 0",
      color: theme.palette.text.black1,
      fontSize: 18,
      textAlign: "left",
    },
    "& ul": {
      justifyContent: "center",
    },
    "& li": {
      "&::before": {
        width: 110,
        marginLeft: 15,
      },
    },
    "& > p": {
      padding: "0 22px",
      margin: " 30px 0 0",
      color: theme.palette.text.black1,
      fontFamily: theme.typography.secondary.main,
      fontSize: 14,
      lineHeight: "21px",
      letterSpacing: "0.25px",
    },
  },
  uploadImageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 0,
    paddingTop: 25,
  },
  switch: {
    "& .Mui-checked": {
      color: theme.palette.text.primary,
    },
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.text.primary,
    },
  },
  parametersContainer: {
    paddingTop: "10px !important",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.lightGray,
    marginTop: "10px !important",
  },
  parameterHeader: {
    display: "flex",
    justifyContent: "space-between",
    "& h4": {
      marginTop: 0,
    },
    "& button": {
      padding: 0,
      marginRight: "0 !important",
    },
  },
  parameters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .fa-info-circle": {
      padding: "12px 0",
      color: theme.palette.text.primary,
      fontSize: 18,
    },
    "& .MuiTextField-root": {
      width: 170,
    },
  },
  switchContainer: {
    display: "flex",
    textItems: "center",
  },
  switchLabel: {
    paddingLeft: 15,
    color: theme.palette.text.black1,
    fontSize: 14,
  },
  optimationRounds: {
    display: "flex",
    alignItems: "center",
    "& i": {
      paddingRight: "10px !important",
    },
  },
  demoContainerButtons: {
    textAlign: "center",
    paddingBottom: 20,
    "& button": {
      marginRight: "0 !important",
      paddingLeft: 70,
      paddingRight: 70,
    },
  },
  serviceDetailsTab: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.lightGray,
    marginTop: 25,
    "& .row": {
      marginTop: 25,
      display: "flex",
      justifyContent: "center",
    },
    "& div": {
      fontFamily: theme.typography.primary.main,
    },
    "& select": {
      marginBottom: "45px !important",
    },
    "& .btn-primary": {
      marginRight: "0 !important",
      backgroundColor: theme.backgroundColor.blue,
      color: theme.palette.text.white,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "transparent",
      padding: "13px 35px 11px",
      textTransform: "uppercase",
      fontFamily: theme.typography.primary.main,
      fontWeight: theme.typography.fontweight,
      letterSpacing: "1.25px",
      lineHeight: "16px",
    },
    "& button": {
      marginBottom: 25,
      "& span": {
        "& span": {
          fontFamily: "OpenSans !important",
        },
      },
      "&:disabled": {
        marginRight: "0 !important",
        backgroundColor: theme.palette.text.disabledBtnBg,
        color: theme.palette.text.white,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
        padding: "13px 35px 11px",
        textTransform: "uppercase",
        fontFamily: theme.typography.primary.main,
        fontWeight: theme.typography.fontweight,
        letterSpacing: "1.25px",
        lineHeight: "16px",
      },
    },
  },
});
