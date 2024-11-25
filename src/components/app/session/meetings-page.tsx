import { Separator } from "@/components/ui/separator";
import SessionsSelector from "../sessions-selector";
import { FormulaState } from "@/reducer";
import SessionInfo from "./session-info";
import { useFormulaContext } from "@/hooks/use-formula";

export default function MeetingPage() {
  const state: FormulaState = useFormulaContext();

  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {state.selectedMeeting?.meeting_official_name}
      </h2>
      <Separator />
      <SessionsSelector />
      <Separator />
      <SessionInfo />
    </>
  );
}
