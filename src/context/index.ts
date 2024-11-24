import { FormulaAction, INITIAL_STATE } from "@/reducer";
import { createContext, Dispatch } from "react";

const FormulaContext = createContext(INITIAL_STATE);
const FormulaDispatchContext = createContext<Dispatch<FormulaAction>>(() => { });
export {
    FormulaContext,
    FormulaDispatchContext,
}