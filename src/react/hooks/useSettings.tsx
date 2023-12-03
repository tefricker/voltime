import { createContext, useContext } from "react";
import { useQuery } from "react-query";

export interface Settings {
  theme: "light" | "dark";
  timeType: "12" | "24";
}

const useSettingsQuery = () => {
  return useQuery(["settings"], async () => {
    const data = await window.api.fetchSettings();
    return data as Settings;
  });
};

const SettingsContext = createContext<Settings | null>(null);

const SettingsProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const settingsQuery = useSettingsQuery();

  return settingsQuery.isSuccess ? (
    <SettingsContext.Provider value={settingsQuery.data}>
      {children}
    </SettingsContext.Provider>
  ) : null;
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
