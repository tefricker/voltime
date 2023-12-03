import moment from "moment-timezone";
import { createContext, useContext, useEffect, useState } from "react";

export interface ClockConfig {
  moment: moment.Moment;
}

const blankClockContext: ClockConfig = {
  moment: moment(),
};

const ClockContext = createContext<ClockConfig>(blankClockContext);

const ClockProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [clock, setClock] = useState<ClockConfig>(blankClockContext);
  useEffect(() => {
    setInterval(() => {
      const momentTime = moment();
      const clock = {
        moment: momentTime,
      };
      setClock(clock);
    }, 1000);
  }, []);

  return clock ? (
    <ClockContext.Provider value={clock}>{children}</ClockContext.Provider>
  ) : null;
};

const useClock = () => useContext(ClockContext);

export { ClockProvider, useClock };
