import { useDrivers } from "@/hooks/use-drivers";
import { FormulaState } from "@/reducer";
import { ReactNode, useEffect, useState } from "react";
import Driver from "@/type/Driver";
import { useFormulaContext } from "@/hooks/use-formula";
import NavigationSession from "./navigation-session";
import SessionData from "./session-data";
import DriverData from "./driver-data";

const SessionInfoWithDrivers = ({
  children,
  drivers,
}: {
  children: ReactNode;
  drivers: Driver[];
}) => {
  return <>{drivers.length > 0 && children}</>;
};

export default function SessionInfo() {
  const state: FormulaState = useFormulaContext();
  const { drivers, getDrivers } = useDrivers();
  const [panel, setPanel] = useState<string>('SESSION');

  useEffect(() => {
    getDrivers(state.selectedSession?.session_key as number);
  }, [getDrivers, state.selectedSession]);

  const navigationSelected = (pane: string) => {
    setPanel(pane);
  };

  const showPane = () => {
    if (panel === "SESSION") return <SessionData />;
    return <DriverData />;
  };

  return (
    <SessionInfoWithDrivers drivers={drivers}>
      <div className="flex mt-2 flex-col">
        <div className="flex justify-center w-full">
          <NavigationSession
            drivers={drivers}
            navigationSelected={navigationSelected}
          />
        </div>
        <>{showPane()}</>
      </div>
    </SessionInfoWithDrivers>
  );
}
