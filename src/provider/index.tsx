import { FormulaContext, FormulaDispatchContext } from "@/context";
import FormulaReducer, { INITIAL_STATE } from "@/reducer";
import { useReducer, ReactNode } from "react";

export default function F1Provider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(FormulaReducer, INITIAL_STATE);

  return (
    <FormulaContext.Provider value={state}>
      <FormulaDispatchContext.Provider value={dispatch}>
        {children}
      </FormulaDispatchContext.Provider>
    </FormulaContext.Provider>
  );
}
