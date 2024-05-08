import { createTheme } from "@mui/material/styles";
import BgDark from "../../assets/images/bgDark.jpg";
import BgLight from "../../assets/images/bgLight.jpg";
// dark theme
// dark mode - set header, text, button color bright
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#4538ae",
    },
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      light: "rgb(0 0 0 / 40%)",
    },
    info: {
      main: "#26124f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url('${BgDark}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          outline: "0px!important",
          paddingTop: "10px",
          "&.MuiFilledInput-root::before": {
            borderBottom: "0px!important",
            outline: "0px!important",
          },
          "&.MuiFilledInput-root::after": {
            borderBottom: "0px!important",
            outline: "0px!important",
          },
        },
      },
    }, //MuiInputBase
    MuiTextField: {
      styleOverrides: {
        root: {
          // backgroundColor: "rgb(255 255 255 /70%)", // Set the background color here
          borderRadius: "10px",
          borderBottom: "0px!important",
        },
      },
    }, // MuiTextField

    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(0 0 0 /70%)!important",
          paddingTop: "0px",
          borderRadius: "10px",
          color: "#ffffff!important",
        },
      },
    }, // MuiFilledInput
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(0 0 0 / 40%)",
          border: "1px solid rgb(0 0 0 / 5%)",
        },
      },
    }, // MuiCard
    MuiStack: {
      styleOverrides: {
        root: {
          marginBottom: "0px",
        },
      },
    }, // MuiStack
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "6px",
        },
      },
    }, // MuiIconButton
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: "10px 0px 0px 0px",
          color: "#ff0000",
        },
      },
    }, // MuiIconButton
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#808080",
        },
      },
    }, // MuiSvgIcon
  },
});

// light theme
// light mode - set header, text, button color light purple
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#a087e1",
    },
    common: {
      white: "#ffffff",
    },
    primary: {
      main: "#6f40b5",
    },
    secondary: {
      main: "#000000",
      light: "rgb(255 255 255 / 40%)",
    },
    info: {
      main: "#6d40b6",
    },
    text: {
      primary: "#666",
      secondary: "#6c41b5",
      info: "#252525",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url('${BgLight}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          outline: "0px!important",
          paddingTop: "10px",
          "&.MuiFilledInput-root::before": {
            borderBottom: "0px!important",
            outline: "0px!important",
          },
          "&.MuiFilledInput-root::after": {
            borderBottom: "0px!important",
            outline: "0px!important",
          },
        },
      },
    }, //MuiInputBase
    MuiTextField: {
      styleOverrides: {
        root: {
          // backgroundColor: "rgb(255 255 255 /70%)", // Set the background color here
          borderRadius: "10px",
          borderBottom: "0px!important",
        },
      },
    }, // MuiTextField

    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255 255 255 /70%)!important",
          paddingTop: "0px",
          borderRadius: "10px",
        },
      },
    }, // MuiFilledInput
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255 255 255 /40%)",
          border: "1px solid rgb(255 255 255 /70%)",
        },
      },
    }, // MuiCard
    MuiStack: {
      styleOverrides: {
        root: {
          marginBottom: "0px",
        },
      },
    }, // MuiStack
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    }, // MuiIconButton
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: "10px 0px 0px 0px",
          color: "#ff0000",
        },
      },
    }, // MuiIconButton
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#808080",
        },
      },
    }, // MuiSvgIcon
  },
});
