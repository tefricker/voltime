import { Title } from "@mui/icons-material";
import { useClock } from "../hooks/useClock";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
const Clock = ({
  title,
  blank = false,
  utc,
}:
  | {
      title: string;
      blank?: false;
      utc: number;
    }
  | { title?: undefined; blank: true; utc?: undefined }) => {
  const clock = useClock(utc);
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
      {!blank ? (
        <>
          <div className="clock-title">{title}</div>
          <div className="clock-time">
            {`${clock.hour}:${clock.minutes}:${clock.seconds}`}
          </div>
        </>
      ) : (
        <Button
          onClick={() => {
            console.log("yes");
          }}
          sx={{ my: 2, color: "black", display: "flex", alignSelf: "center" }}
        >
          <AddIcon
            sx={{ display: { xs: "flex" }, height: 100, width: "auto" }}
          />
        </Button>
      )}
    </Box>
  );
};

export default Clock;
