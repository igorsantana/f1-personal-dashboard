import { FormulaContext, FormulaDispatchContext } from "@/context";
import { useContext } from "react";

function useFormulaContext() {
    return useContext(FormulaContext);
}

function useFormulaDispatchContext() {
    return useContext(FormulaDispatchContext);
}

export {
    useFormulaContext,
    useFormulaDispatchContext
}