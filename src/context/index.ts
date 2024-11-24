import { FormulaAction, INITIAL_STATE } from "@/reducer";
import { createContext, Dispatch, useContext } from "react";

const FormulaContext = createContext(INITIAL_STATE);
const FormulaDispatchContext = createContext<Dispatch<FormulaAction>>(() => { });


function useFormulaContext() {
    return useContext(FormulaContext);
}

function useFormulaDispatchContext() {
    return useContext(FormulaDispatchContext);
}

export {
    FormulaContext,
    FormulaDispatchContext,
    useFormulaContext,
    useFormulaDispatchContext
}