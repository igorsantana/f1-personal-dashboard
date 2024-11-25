import FormulaService from "@/services/FormulaService";
import RaceControl from "@/type/RaceControl";
import { useState, useCallback } from "react";

export const useRaceControl = () => {
    const [raceControl, setRaceControl] = useState<RaceControl[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const svc = FormulaService()

    const getRaceControl = useCallback(
        async (sk: number, mk: number) => {
            try {
                setIsPending(true)
                const json = await svc.raceControl(`session_key=${sk}&meeting_key=${mk}`)
                setRaceControl(json)
            } catch (error) {
                setError(`${error}`)
            } finally {
                setIsPending(false)
            }
        }, [svc]
    )
    return { raceControl, isPending, error, getRaceControl };
};

