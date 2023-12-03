import { Box, Grid, Modal, Paper } from "@mui/material";
import Clock from "../components/Clock";
import { ClockProvider, useClock } from "../hooks/useClock";
import { useState } from "react";
import Navbar from "../components/Navbar";
import moment from "moment-timezone";
import BarreRecherche from "../components/UTCSearchBar";
import { useMutation, useQuery, useQueryClient } from "react-query";

export type ClockData = {
  name: string | null;
  id?: string;
  timezone: string;
};

const InternationalClocks = () => {
  const queryClient = useQueryClient();
  const useclocksQuery = () => {
    return useQuery(["clocks"], async () => {
      const data = await window.api.fetchClocks();
      return data as ClockData[];
    });
  };

  const clocksQuery = useclocksQuery();

  const addclockMutation = useMutation(
    async (payload: ClockData) => {
      const res = await window.api.addClock(payload);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["clocks"]);
      },
    }
  );

  const deleteclockMutation = useMutation(
    async (id: string) => {
      const res = await window.api.deleteClock(id);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["clocks"]);
      },
    }
  );

  return (
    <>
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
          {clocksQuery.isSuccess &&
            clocksQuery.data.map((clock) => {
              return (
                <Paper elevation={1} key={clock.id}>
                  <Clock
                    name={clock.name}
                    timezone={clock.timezone}
                    deleteClock={() => deleteclockMutation.mutate(clock.id)}
                  />
                </Paper>
              );
            })}
          <Paper elevation={1}>
            <Clock
              blank
              addClock={(payload: ClockData) =>
                addclockMutation.mutate(payload)
              }
            />
          </Paper>
        </Box>
      </Grid>
    </>
  );
};

export default InternationalClocks;
