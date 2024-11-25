import { useSessions } from "@/hooks/use-sessions";
import { FormulaState } from "@/reducer";
import Session from "@/type/Session";
import { StepForward } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import {
  useFormulaDispatchContext,
  useFormulaContext,
} from "@/hooks/use-formula";

export default function SessionsSelector() {
  const dispatch = useFormulaDispatchContext();
  const state: FormulaState = useFormulaContext();
  const { sessions, getSessions } = useSessions();

  useEffect(() => {
    if (state.selectedMeeting?.meeting_key && state.selectedMeeting?.year) {
      getSessions(
        state.selectedMeeting?.meeting_key,
        state.selectedMeeting?.year
      );
    }
  }, [
    getSessions,
    state.selectedMeeting?.meeting_key,
    state.selectedMeeting?.year,
  ]);

  const selectSession = (value: Session) => {
    dispatch({ type: "SESSION_SELECTED", value });
  };

  return (
    <div className="m-3 flex gap-4 justify-center	">
      {sessions.map((ses: Session) => {
        return (
          <Card
            key={ses.session_key}
            className="w-4/12 hover:shadow-lg hover:shadow-cyan-500/50 hover:cursor-pointer"
          >
            <CardHeader onClick={() => selectSession(ses)}>
              <CardTitle className="text-sm text-center">
                {ses.session_name} -{" "}
                {moment(ses.date_start).format("DD/MM/YYYY")}
              </CardTitle>
              <CardDescription className="flex justify-center justify-evenly	">
                {moment(ses.date_start).format("HH:mm")}
                <StepForward size={18} />
                {moment(ses.date_end).format("HH:mm")}
              </CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
