import { createMuiTheme } from "@material-ui/core";
import { responsiveFontSizes } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0BB5E0",
    },
  },

  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        borderRadius: "2px",
        padding: "2px",
        minWidth: "35px",
      },
    },
    MuiButtonBase: {},
    MuiTextField: {
      root: {
        paddding: 0,
      },
    },
    MuiTypography: {
      h6: {
        fontSize: 17,
        fontWeight: 500,
      },
    },
    MuiFormControl: {
      root: {
        borderRadius: "5px",
      },
    },
    MuiInputLabel: {
      focused: {
        color: "red",
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: "0px",
        paddingLeft: "7px",
        height: "33px",
      },
      notchedOutline: {},
      inputMarginDense: {
        height: "2px",
      },
    },

    MuiInputBase: {
      root: {
        backgroundColor: "white",
      },
      input: {
        padding: "0px",
      },
      focus: {
        color: "black",
      },
    },

    MuiSlider: {
      track: {
        height: "7px",
        borderRadius: "5px",
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
      thumb: {
        top: "10px",
        [breakpoints.down("500")]: {
          top: "16px",
        },
        border: "2px solid #0BB5E0",
        color: "white",
        padding: "10px",
        "&:focus, &:hover, &$active": {
          boxShadow: "#ccc 0px 0px 7px",
        },
      },
      mark: {
        display: "none",
        backgroundColor: "#bfbfbf",
        height: 5,
        width: 3,
        bottom: "5px",
      },
      // markActive: {
      //   display: "block",
      //   backgroundColor: "black",
      // },
      valueLabel: {
        left: "calc(-50% + 4px)",
        border: "2px solid #0BB5E0",

        "& *": {
          backgroundColor: "white",

          transform: "none",
        },
      },
      // valueLabel: {
      //   fontWeight: 700,
      //   top: "-15px",
      "& *": {
        backgroundColor: "#1976D2",
        transform: "none",
        borderRadius: "5px",
        width: "35px",
        height: "20px",
      },
      //   transfrom: "rotate(100deg)",
      // },
    },
  },

  props: {
    MuiPaper: {
      elevation: 5,
    },
    MuiButton: {
      variant: "text",
      color: "primary",
      disableRipple: "true",
      backgroundColor: "transparent",
    },
  },
});
theme = responsiveFontSizes(theme);

theme.typography.h6 = {
  fontFamily: "Roboto",
  fontSize: "4rem",
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.0rem",
  },
};
// theme.typography.body1 = {
//   fontFamily: "Roboto",
//   fontSize: "1.2rem",
//   [theme.breakpoints.down("xs")]: {
//     fontSize: "0.7rem",
//   },
// };
// theme.typography.h4 = {
//   fontFamily: "Roboto",
//   fontSize: "2rem",
//   [theme.breakpoints.down("xs")]: {
//     fontSize: "1.7rem",
//   },
// };

export default theme;
