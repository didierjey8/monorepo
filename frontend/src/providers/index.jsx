import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AlertProvider } from "./AlertProvider";
import { AuthProvider } from "./AuthProvider";
import Theme from "../theme";

function MainProvider({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <AuthProvider>
          <AlertProvider>{children}</AlertProvider>
        </AuthProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default MainProvider;
