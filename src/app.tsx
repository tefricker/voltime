import { createRoot } from "react-dom/client";
import InternationalClocks from "./react/pages";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./react/components/Navbar";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import Alarms from "./react/pages/alarms";
import Settings from "./react/pages/settings";
import { SettingsProvider, useSettings } from "./react/hooks/useSettings";
import { QueryClient, QueryClientProvider } from "react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ClockProvider } from "./react/hooks/useClock";
import AlarmBuzzer from "./react/components/AlarmBuzzer";

const App = () => {
  const settings = useSettings();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#000000",
        light: "#42a5f5",
        dark: "#1565c0",
        contrastText: "#fff",
      },
    },
  });

  return (
    <>
      <Navbar />
      <ThemeProvider theme={settings.theme === "dark" ? darkTheme : lightTheme}>
        <>
          <CssBaseline />
          <ClockProvider>
            <Outlet />
            <AlarmBuzzer />
          </ClockProvider>
        </>
      </ThemeProvider>
    </>
  );
};

const router = createHashRouter([
  {
    element: (
      <QueryClientProvider client={new QueryClient()}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    ),
    children: [
      {
        path: "/",
        element: <InternationalClocks />,
      },
      {
        path: "/alarms",
        element: <Alarms />,
      },

      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("app"));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);
