import Meeting from "@/type/Meeting";
import Session from "@/type/Session";

type FormulaAction = { type: string; value: number | Meeting | Session }

interface FormulaState {
    season: number;
    selectedMeeting?: Meeting;
    selectedSession?: Session;
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
    return state;
}

export default FormulaReducer;

export { INITIAL_STATE };
export type { FormulaAction, FormulaState };
