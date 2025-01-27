export const useStyles = theme => ({
  computerVisionContainer: {
    display: "flex",
  },
  computerVisionContent: {
    marginLeft: 25,
    "& > span": {
      color: theme.palette.text.primary,
      fontSize: 14,
      textTransform: "uppercase",
    },
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 38,
    },
  },
  ratingStars: {
    "& .dv-star-rating-empty-star": {
      "& i": {
        color: theme.palette.text.disabledBtnBg,
      },
    },
    "& i": {
      color: theme.palette.text.RatingStarColor,
      fontSize: 22,
      paddingRight: 2,
    },
  },
  apiCall: {
    padding: "6px 15px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.lightGray,
    borderRadius: 4,
    marginLeft: 20,
    color: theme.palette.text.lightShadedGray,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 2,
    verticalAlign: "super",
  },
});
