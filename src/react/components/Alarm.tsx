import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DesktopTimePicker } from "@mui/x-date-pickers";
import { useSettings } from "../hooks/useSettings";
import { Dayjs } from "dayjs";
import moment from "moment-timezone";

export type AlarmData = {
  name: string | null;
  id?: string;
  time: string;
};

const Alarm = ({
  name,
  blank = false,
  time,
  addAlarm,
  deleteAlarm,
}:
  | {
      name: string;
      blank?: false;
      time: string;
      addAlarm?: undefined;
      deleteAlarm?: () => void;
    }
  | {
      name?: undefined;
      blank: true;
      time?: string;
      addAlarm: (payload: AlarmData) => void;
      deleteAlarm?: undefined;
    }) => {
  const [alarmEdit, setAlarmEdit] = useState<null | AlarmData>(null);
  const setting = useSettings();
  return (
    <Box
      sx={{
        my: 2,
        color: "black",
        display: "flex",
        height: 142,
        alignItems: "flex-start",
        justifyContent: "space-around",
      }}
    >
      {!alarmEdit &&
        (!blank ? (
          <>
            <Button onClick={() => deleteAlarm()}>
              <Delete />
            </Button>
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.main,
              }}
              className="clock-title"
            >
              {name}
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.main,
              }}
              className="clock-time"
            >
              {setting.timeType === "24"
                ? time
                : moment(time, "HH:mm").format("hh:mm    A")}
            </Typography>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                setAlarmEdit({ name: null, time: "" });
              }}
              sx={{
                my: 2,
                color: "black",
                display: "flex",
                alignSelf: "center",
              }}
            >
              <AddIcon
                sx={{ display: { xs: "flex" }, height: 100, width: "auto" }}
              />
            </Button>
          </>
        ))}
      {alarmEdit && (
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            aria-describedby="my-helper-text"
            onChange={(e) =>
              setAlarmEdit((alarmEdit) => {
                return {
                  name: e.target.value,
                  time: alarmEdit.time,
                };
              })
            }
          />
          <DesktopTimePicker
            ampm={Boolean(setting.timeType === "12")}
            sx={{ my: 0.5 }}
            label=""
            onChange={(e: Dayjs, context) => {
              if (context.validationError == null) {
                setAlarmEdit((alarmEdit) => {
                  return {
                    name: alarmEdit.name,
                    time: e.format("HH:mm"),
                  };
                });
              }
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (alarmEdit.time !== "") {
                addAlarm(alarmEdit);
                setAlarmEdit(null);
              }
            }}
          >
            Save
          </Button>
        </FormControl>
      )}
    </Box>
  );
};

export default Alarm;
