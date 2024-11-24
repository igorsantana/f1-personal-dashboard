import { useFormulaContext, useFormulaDispatchContext } from "@/context";
import { useDrivers } from "@/hooks/use-drivers";
import { FormulaState } from "@/reducer";
import { ReactNode, useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { ChevronDown } from "lucide-react";
import ListItem from "../ui/list-item";
import Driver from "@/type/Driver";

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
  const dispatch = useFormulaDispatchContext();
  const { drivers, getDrivers } = useDrivers();

  useEffect(() => {
    getDrivers(state.selectedSession?.session_key as number);
  }, [getDrivers, state.selectedSession]);

  const selectDriver = (value: Driver) => {
    dispatch({ type: "DRIVER_SELECTED", value });
  };

  const fullName = (d: Driver) => d.first_name + " " + d.last_name;
  return (
    <SessionInfoWithDrivers drivers={drivers}>
      <div className="flex mt-2">
        <div className="flex justify-center w-full">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {state.selectedDriver
                    ? fullName(state.selectedDriver)
                    : "Individual Driver"}
                  <ChevronDown
                    className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[600px] ">
                    {drivers.map((driver) => (
                      <ListItem
                        key={driver.driver_number}
                        title={driver.first_name + " " + driver.last_name}
                        className="hover:cursor-pointer"
                        onClick={() => selectDriver(driver)}
                      >
                        {driver.team_name}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Session Information
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </SessionInfoWithDrivers>
  );
}
