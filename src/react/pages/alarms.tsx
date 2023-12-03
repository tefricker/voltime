import { Box, Grid, Paper } from "@mui/material";
import Alarm, { AlarmData } from "../components/Alarm";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Alarms = () => {
  const queryClient = useQueryClient();
  const useAlarmsQuery = () => {
    return useQuery(["alarms"], async () => {
      const data = await window.api.fetchAlarms();
      return data as AlarmData[];
    });
  };

  const alarmsQuery = useAlarmsQuery();

  const addAlarmMutation = useMutation(
    async (payload: AlarmData) => {
      const res = await window.api.addAlarm(payload);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["alarms"]);
      },
    }
  );

  const deleteAlarmMutation = useMutation(
    async (id: string) => {
      const res = await window.api.deleteAlarm(id);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["alarms"]);
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
          {alarmsQuery.isSuccess &&
            alarmsQuery.data.map((alarm) => {
              return (
                <Paper elevation={1} key={alarm.id}>
                  <Alarm
                    name={alarm.name}
                    time={alarm.time}
                    deleteAlarm={() => deleteAlarmMutation.mutate(alarm.id)}
                  />
                </Paper>
              );
            })}
          <Paper elevation={1}>
            <Alarm
              blank
              addAlarm={(payload: AlarmData) =>
                addAlarmMutation.mutate(payload)
              }
            />
          </Paper>
        </Box>
      </Grid>
    </>
  );
};

export default Alarms;
