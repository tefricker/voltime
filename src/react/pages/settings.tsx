import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { useSettings } from "../hooks/useSettings";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const Settings = () => {
  const settings = useSettings();
  const queryClient = useQueryClient();
  const editSingleSettingMutation = useMutation(
    async ({ type, value }: { type: string; value: string }) => {
      const res = await window.api.handleSingleSettingModification({
        type,
        value,
      });
      return res;
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["settings"]);
      },
    }
  );
  return (
    <Box
      sx={{
        my: 2,
        mx: "auto",
        color: "black",
        display: "flex",
        alignItems: "center",
      }}
    >
      <FormControl fullWidth style={{ display: "flex", alignItems: "center" }}>
        <FormLabel id="theme-label">Theme 💡</FormLabel>
        <RadioGroup
          aria-labelledby="theme-label"
          value={settings.theme}
          name="radio-buttons-group"
          sx={{ mb: 4 }}
          onChange={(e) => {
            editSingleSettingMutation.mutate({
              type: "theme",
              value: e.target.value as "light" | "dark",
            });
          }}
        >
          <FormControlLabel
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
            value="light"
            control={<Radio />}
            label={<Typography>Light</Typography>}
          />
          <FormControlLabel
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
            value="dark"
            control={<Radio />}
            label={<Typography>Dark</Typography>}
          />
        </RadioGroup>
        <FormLabel id="timeFormat-label">Time format ⩇⩇:⩇⩇</FormLabel>
        <RadioGroup
          aria-labelledby="timeFormat-label"
          value={settings.timeType}
          name="radio-buttons-group"
          sx={{ mb: 4 }}
          onChange={(e) => {
            editSingleSettingMutation.mutate({
              type: "timeType",
              value: e.target.value as "24" | "12",
            });
          }}
        >
          <FormControlLabel
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
            value="24"
            control={<Radio />}
            label={<Typography>24h</Typography>}
          />
          <FormControlLabel
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
            value="12"
            control={<Radio />}
            label={<Typography>12h</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default Settings;
