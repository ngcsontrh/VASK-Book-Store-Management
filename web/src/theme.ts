import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1890ff", // Ant Design primary blue
      contrastText: "#ffffff", // Ant Design primary contrast text
      light: "#40a9ff", // Ant Design primary light blue
      dark: "#096dd9", // Ant Design primary dark blue
    },
    secondary: {
      main: "#8c8c8c", // Ant Design grey-60
      contrastText: "#ffffff", // Ant Design secondary contrast text
      light: "#bfbfbf", // Ant Design secondary light grey
      dark: "#595959", // Ant Design secondary dark grey
    },
    error: {
      main: "#f5222d", // Ant Design red
      contrastText: "#ffffff", // Ant Design error contrast text
      light: "#ff7875", // Ant Design error light red
      dark: "#cf1322", // Ant Design error dark red
    },
    warning: {
      main: "#faad14", // Ant Design gold
      contrastText: "#ffffff", // Ant Design warning contrast text
      light: "#ffc53d", // Ant Design warning light gold
      dark: "#d48806", // Ant Design warning dark gold
    },
    info: {
      main: "#1890ff", // Ant Design blue
      contrastText: "#ffffff", // Ant Design info contrast text
      light: "#40a9ff", // Ant Design info light blue
      dark: "#096dd9", // Ant Design info dark blue
    },
    success: {
      main: "#52c41a", // Ant Design green
      contrastText: "#ffffff", // Ant Design success contrast text
      light: "#73d13d", // Ant Design success light green
      dark: "#389e0d", // Ant Design success dark green
    },
    background: {
      default: "#f0f2f5", // Ant Design background
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.85)", // Ant Design text
      secondary: "rgba(0, 0, 0, 0.45)", // Ant Design secondary text
      disabled: "rgba(0, 0, 0, 0.25)", // Ant Design disabled text
    },
    action: {
      selected: "rgba(68, 10, 10, 0.08)", // Ant Design selected action
      selectedOpacity: 0.08, // Ant Design selected action opacity
      disabled: "rgba(0, 0, 0, 0.25)", // Ant Design disabled action
      disabledOpacity: 0.25, // Ant Design disabled action opacity
      disabledBackground: "rgba(0, 0, 0, 0.08)", // Ant Design disabled background
      focus: "rgba(0, 0, 0, 0.12)", // Ant Design focus action
      focusOpacity: 0.12, // Ant Design focus action opacity
      activatedOpacity: 0.24, // Ant Design activated action opacity
    },
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 4, // Ant Design border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 4,
        },
        containedPrimary: {
          backgroundColor: "#1890ff",
          "&:hover": {
            backgroundColor: "#40a9ff",
          },
        },
        containedSecondary: {
          backgroundColor: "#8c8c8c",
          "&:hover": {
            backgroundColor: "#bfbfbf",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#ffffff",
          color: "rgba(0, 0, 0, 0.85)",
          borderBottom: "1px solid #f0f0f0",
        },
      },
    },
  },
});

export default theme;
