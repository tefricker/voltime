import { createRoot } from "react-dom/client";
import App from "./react/pages";
import { CssBaseline } from "@mui/material";

const root = createRoot(document.getElementById("app"));
root.render(
  <>
    <CssBaseline />
    <App />
  </>
);
