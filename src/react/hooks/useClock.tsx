import { createContext, useContext, useEffect, useState } from "react";

export interface ClockConfig {
  hour: string;
  minutes: string;
  seconds: string;
  time: Date;
}

const doubleDigitBase10 = (number: number) => {
  return number < 10 ? "0" + number : number.toString();
};

const blankClockContext: ClockConfig = {
  hour: doubleDigitBase10(new Date().getHours()),
  minutes: doubleDigitBase10(new Date().getMinutes()),
  seconds: doubleDigitBase10(new Date().getSeconds()),
  time: new Date(),
};

const ClockContext = createContext<ClockConfig>(blankClockContext);

const applyTimezone = (utc: number, clockContext: ClockConfig) => {
  return {
    ...clockContext,
    hour: doubleDigitBase10(parseInt(clockContext.hour, 10) + utc).toString(),
  };
};

const ClockProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [clock, setClock] = useState<ClockConfig>(blankClockContext);
  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      const clock = {
        time: time,
        hour: doubleDigitBase10(time.getHours()),
        minutes: doubleDigitBase10(time.getMinutes()),
        seconds: doubleDigitBase10(time.getSeconds()),
      };
      setClock(clock);
    }, 1000);
  }, []);

  return clock ? (
    <ClockContext.Provider value={clock}>{children}</ClockContext.Provider>
  ) : null;
};

const useClock = (utc: number) => applyTimezone(utc, useContext(ClockContext));

export { ClockProvider, useClock };
