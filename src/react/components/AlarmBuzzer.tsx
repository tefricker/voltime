import { useEffect, useState } from "react";
import { useClock } from "../hooks/useClock";
import { useQuery } from "react-query";
import { AlarmData } from "./Alarm";
import { Alert, Button, Collapse } from "@mui/material";

const AlarmBuzzer = () => {
  const time = useClock();
  const [hasRingedForThisMinute, setHasRingedForThisMinute] =
    useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [alarm] = useState(
    // eslint-disable-next-line
    new Audio(require("../../assets/alarm.wav"))
  );
  const [name, setName] = useState(null);
  const useAlarmsQuery = () => {
    return useQuery(["alarms"], async () => {
      const data = await window.api.fetchAlarms();
      return data as AlarmData[];
    });
  };

  const alarmsQuery = useAlarmsQuery();
  const handleClose = () => {
    setOpen(false);
    alarm.pause();
  };

  useEffect(() => {
    if (hasRingedForThisMinute) {
      return;
    }

    const alarmsTime = alarmsQuery.isSuccess
      ? alarmsQuery.data.map((alarmOb) => alarmOb.time)
      : [];

    if (alarmsTime.includes(time.moment.format("HH:mm"))) {
      setName(
        alarmsQuery.data.find(
          (alarm) => alarm.time === time.moment.format("HH:mm")
        ).name
      );
      alarm.play();
      setOpen(true);
      setHasRingedForThisMinute(true);
      setTimeout(() => {
        setOpen(false);
        setHasRingedForThisMinute(false);
        alarm.pause();
      }, 60000);
    }
  }, [time]);

  return (
    <Collapse in={open}>
      <Alert
        action={<Button onClick={handleClose}>Stop</Button>}
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          fontSize: 57,
          transform: "translateX(-50%)",
        }}
      >
        {name ?? "Alarm"}
      </Alert>
    </Collapse>
  );
};

export default AlarmBuzzer;
