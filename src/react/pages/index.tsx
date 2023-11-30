import { Box, Grid, Modal, Paper } from "@mui/material";
import Clock from "../components/Clock";
import { ClockProvider } from "../hooks/useClock";
import { useState } from "react";
import Navbar from "../components/Navbar";

interface ClockType {
  name: string;
  utc: number;
}

const App = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [clocks, setClocks] = useState<ClockType[]>([
    { name: "Paris", utc: 0 },
    { name: "Tokyo", utc: -3 },
    { name: "Istanbul", utc: 9 },
    { name: "Digne-Les-Bains", utc: 6 },
  ]);
  return (
    <>
      <Navbar setSettingsOpened={setSettingsOpened} />
      <ClockProvider>
        <Grid item xs={6} key={"123"}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr" },
              gap: 2,
            }}
          >
            {clocks.map((clock) => {
              return (
                <Paper elevation={1}>
                  <Clock title={clock.name} utc={clock.utc} />
                </Paper>
              );
            })}
            <Paper elevation={1}>
              <Clock blank />
            </Paper>
          </Box>
        </Grid>
      </ClockProvider>
      <Modal open={settingsOpened} onClose={() => setSettingsOpened((s) => !s)}>
        <div>testTTTTTT3 </div>
      </Modal>
    </>
  );
};

export default App;
