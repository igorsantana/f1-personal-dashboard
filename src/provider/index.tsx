import { FormulaContext, FormulaDispatchContext } from "@/context";

import useFormulaReducer from "@/hooks/use-formula-reducer";
import { ReactNode } from "react";

export default function F1Provider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useFormulaReducer();
  return (
    <FormulaContext.Provider value={state}>
      <FormulaDispatchContext.Provider value={dispatch}>
        {children}
      </FormulaDispatchContext.Provider>
    </FormulaContext.Provider>
  );
}
