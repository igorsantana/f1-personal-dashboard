import Driver from "@/type/Driver";
import Meeting from "@/type/Meeting";
import Session from "@/type/Session";

type FormulaAction = { type: string; value: number | Meeting | Session | Driver | undefined }

interface FormulaState {
    season: number;
    selectedMeeting?: Meeting;
    selectedSession?: Session;
    selectedDriver?: Driver;
}

const INITIAL_STATE: FormulaState = {
    season: 2024,
}

function FormulaReducer(state: FormulaState, action: FormulaAction): FormulaState {
    if (action.type === 'SEASON_CHANGED') {
        return { ...state, season: action.value as number }
    }
    if (action.type === 'MEETING_SELECTED') {
        return { ...state, selectedMeeting: action.value as Meeting }
    }
    if (action.type === 'SESSION_SELECTED') {
        return { ...state, selectedSession: action.value as Session }
    }
    if (action.type === 'DRIVER_SELECTED') {
        return { ...state, selectedDriver: action.value as Driver }
    }
    return state;
}

export default FormulaReducer;

export { INITIAL_STATE };
export type { FormulaAction, FormulaState };
