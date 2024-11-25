import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../../ui/navigation-menu";
import { ChevronDown } from "lucide-react";
import ListItem from "../../ui/list-item";
import {
  useFormulaContext,
  useFormulaDispatchContext,
} from "@/hooks/use-formula";
import { FormulaState } from "@/reducer";
import Driver from "@/type/Driver";

export default function NavigationSession({
  drivers,
  navigationSelected,
}: {
  drivers: Driver[];
  navigationSelected: (e: string) => void;
}) {
  const state: FormulaState = useFormulaContext();
  const dispatch = useFormulaDispatchContext();

  const selectDriver = (value: Driver) => {
    dispatch({ type: "DRIVER_SELECTED", value });
    navigationSelected("DRIVER");
  };

  const openSessionInfo = () => {
    navigationSelected("SESSION");
  };
  const fullName = (d: Driver) => d.first_name + " " + d.last_name;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => openSessionInfo()}>
            Session Information
          </NavigationMenuTrigger>
        </NavigationMenuItem>
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}
