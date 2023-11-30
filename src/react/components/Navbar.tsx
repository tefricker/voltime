import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { Dispatch, SetStateAction } from "react";
const Navbar = ({
  setSettingsOpened,
}: {
  setSettingsOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccessTimeRoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <Button
              onClick={(handleCloseNavMenu) => console.log("oui")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Horloges
            </Button>
            <Button
              onClick={(handleCloseNavMenu) => console.log("oui")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Alarmes
            </Button>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: { xs: "flex", md: "flex" },
            }}
          >
            <Button
              onClick={() => setSettingsOpened(true)}
              sx={{
                my: 2,
                color: "white",
                display: "flex",
              }}
            >
              <SettingsIcon sx={{ display: { xs: "flex" } }} />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
