import { Delete } from "@mui/icons-material";
import { useClock } from "../hooks/useClock";
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
import UTCSearchBar from "./UTCSearchBar";
import moment from "moment-timezone";
import { useSettings } from "../hooks/useSettings";

interface ClockData {
  name?: string;
  timezone: string;
}

const Clock = ({
  name,
  blank = false,
  timezone,
  addClock,
  deleteClock,
}:
  | {
      name: string;
      blank?: false;
      timezone: string;
      addClock?: undefined;
      deleteClock: () => void;
    }
  | {
      name?: undefined;
      blank: true;
      timezone?: undefined;
      addClock: (data: ClockData) => void;
      deleteClock?: undefined;
    }) => {
  const clock = useClock();
  const settings = useSettings();
  const handleSelectChange = (newValue: { value: string; label: string }) => {
    setClockEdited((clockEdit) => {
      return {
        name: clockEdit.name,
        timezone: newValue.value,
      };
    });
  };
  const allTimezones = moment.tz.names();

  const options = allTimezones.map((timezone) => ({
    value: timezone,
    label: timezone,
  }));
  const [clockEdited, setClockEdited] = useState<null | ClockData>(null);
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
      {!clockEdited &&
        (!blank ? (
          <>
            <Button onClick={() => deleteClock()}>
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
              {clock.moment
                .tz(timezone)
                .format(
                  settings.timeType === "24" ? "HH:mm:ss" : "hh:mm:ss    A"
                )}
            </Typography>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                setClockEdited({ name: null, timezone: "" });
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
      {clockEdited && (
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            aria-describedby="name"
            onChange={(e) =>
              setClockEdited((clockEdit) => {
                return {
                  name: e.target.value,
                  timezone: clockEdit.timezone,
                };
              })
            }
          />
          <div style={{ marginTop: 5, marginBottom: 5 }}>
            <UTCSearchBar options={options} onChange={handleSelectChange} />
          </div>
          <Button
            variant="contained"
            onClick={() => {
              if (clockEdited.timezone !== "") {
                addClock(clockEdited);
                setClockEdited(null);
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

export default Clock;
