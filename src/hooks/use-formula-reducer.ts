import FormulaReducer, { INITIAL_STATE } from "@/reducer";
import { useReducer } from "react";

function useFormulaReducer() {

    return useReducer(FormulaReducer, INITIAL_STATE);
}
export default useFormulaReducer