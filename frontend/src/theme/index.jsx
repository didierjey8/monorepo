import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#2E373E",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#2E373E",
    },
    background: {
      default: "#F8F9FA",
    },
    text: {
      light: "#7F7F7F",
    },
    success: {
      main: "#28a745",
      light: "#92d13c",
    },
    custom: {
      polygon: {
        main: "#8142EE",
      },
      avalanche: {
        main: "#e13f40",
      }
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    button: {
      textTransform: "initial",
    },
  },
  shadows: [
    "none",
    "0px 4px 16px 0px #45549229",
    "0px 2px 8px 0px #45549220",
    "0px 2px 8px 0px #2E373E44",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
    "0px 4px 16px 0px #45549229",
  ],
  shape: {
    borderRadius: 12,
  },
  sizes: {
    header: {
      main: 64,
    },
    sidebar: {
      main: 256,
      active: 240,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1600,
    },
  },
  debouncing: {
    delay: 500,
  },
  components: {
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 1,
          sx: { borderRadius: 1.5 },
        },
        sx: {
          "& .MuiModal-backdrop": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(2.5px)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        SelectProps: { MenuProps: { slotProps: { paper: { elevation: 1, sx: { borderRadius: 0.5 } } } } },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiIcon: {
      defaultProps: {
        baseClassName: "fas",
        fontSize: "small",
        style: {
          display: "flex",
          justifyContent: "center",
          width: "min-content",
          aspectRatio: 1,
          overflow: "visible",
        },
      },
    },
  },
});

export default Theme;
