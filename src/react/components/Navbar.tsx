import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccessTimeRoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate("/")}
            >
              Clocks
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate("/alarms")}
            >
              Alarms
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
              onClick={() => navigate("/settings")}
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
