import { useFormulaContext } from "@/context";
import { useDrivers } from "@/hooks/use-drivers";
import { FormulaState } from "@/reducer";
import { useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Driver from "@/type/Driver";
import { Separator } from "../ui/separator";

export default function SessionInfo() {
  const state: FormulaState = useFormulaContext();
  const { drivers, getDrivers } = useDrivers();

  useEffect(() => {
    getDrivers(state.selectedSession?.session_key as number);
  }, [getDrivers, state.selectedSession]);

  const loadDriverList = () => {
    if (drivers.length == 0) {
      return;
    }
    return (
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {drivers.map((driver: Driver) => (
            <>
              <div key={driver.driver_number} className="text-sm">
                {driver.broadcast_name}
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <>
      <h3 className="text-xl font-semibold mt-2 ml-1">
        {state.selectedSession?.session_name}
      </h3>
      <div>{loadDriverList()}</div>
    </>
  );
}
