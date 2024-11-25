import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormulaContext } from "@/hooks/use-formula";
import { useRaceControl } from "@/hooks/use-race-control";
import RaceControl from "@/type/RaceControl";
import {
  Ambulance,
  Flag,
  FlagOff,
  Goal,
  MessageCircleMore,
  Wind,
} from "lucide-react";
import moment from "moment";
import { useEffect } from "react";

export default function RaceControlCard() {
  const state = useFormulaContext();
  const { raceControl, getRaceControl } = useRaceControl();

  useEffect(() => {
    if (state.selectedSession) {
      getRaceControl(
        state.selectedSession?.session_key,
        state.selectedSession?.meeting_key
      );
    }
  }, [state.selectedSession]);
  //   CarEvent, Drs, Flag, SafetyCar
  const getIcon = (ctrl: RaceControl) => {
    if (ctrl.category === "Flag") {
      if (ctrl.flag === "DOUBLE YELLOW") {
        return (
          <div className="flex">
            <Flag color={"#a89832"} />
            <Flag color={"#a89832"} />
          </div>
        );
      }

      if (ctrl.flag === "BLACK AND WHITE") {
        return (
          <div className="flex">
            <Flag color={"#2d2d2e"} />
            <Flag color={"#ffffff"} />
          </div>
        );
      }
      if (ctrl.flag === "YELLOW") return <Flag color={"#a89832"} />;
      if (ctrl.flag === "GREEN") return <Flag color={"#32a852"} />;
      if (ctrl.flag === "BLUE") return <Flag color={"#221799"} />;
      if (ctrl.flag === "CHEQUERED") return <Goal />;
      if (ctrl.flag === "CLEAR") return <FlagOff />;
    }
    if (ctrl.category === "Drs") {
      return <Wind />;
    }
    if (ctrl.category === "SafetyCar") {
      return <Ambulance />;
    }
    return <MessageCircleMore />;
  };
  const formatDate = (dt: string) => moment(dt).format("HH:mm:ss");

  return (
    <Card className="w-8/12">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Flag /> Race Control
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full h-full rounded-md border p-4 h-72">
          <ul>
            {raceControl.map((ctrl: RaceControl, ix: number) => (
              <li key={ix} className="flex gap-2 items-center my-1">
                <span className="w-1/12 text-center	">{getIcon(ctrl)}</span>
                <span className="text-xs text-ellipsis overflow-hidden w-8/12">
                  {ctrl.message}
                </span>
                <span className="text-xs w-1/12 text-center	">
                  {ctrl.lap_number && "Lap " + ctrl.lap_number}
                </span>
                <span className="text-xs w-2/12 text-center	">{formatDate(ctrl.date)}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
