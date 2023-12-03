import "./index.css";
import "./app";
import { AlarmData } from "./react/components/Alarm";
import { Settings } from "./react/hooks/useSettings";
import { ClockData } from "./react/pages";
export interface IElectronAPI {
  handleSingleSettingModification: ({
    type,
    value,
  }: {
    type: string;
    value: string;
  }) => Promise<void>;
  fetchSettings: () => Promise<Settings>;
  addAlarm: ({ name, time }: { name: string; time: string }) => Promise<void>;
  fetchAlarms: () => Promise<AlarmData[]>;
  deleteAlarm: (id: string) => Promise<void>;
  addClock: ({
    name,
    timezone,
  }: {
    name: string;
    timezone: string;
  }) => Promise<void>;
  fetchClocks: () => Promise<ClockData[]>;
  deleteClock: (id: string) => Promise<void>;
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
