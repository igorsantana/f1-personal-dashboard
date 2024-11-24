
import FormulaService from "@/services/FormulaService";
import Session from "@/type/Session";
import { useState, useCallback } from "react";

export const useSessions = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const svc = FormulaService()

    const getSessions = useCallback(
        async (meeting: number, year: number) => {
            try {
                setIsPending(true)
                const json = await svc.sessions(`meeting_key=${meeting}&year=${year}`)
                setSessions(json)
            } catch (error) {
                setError(`${error}`)
            } finally {
                setIsPending(false)
            }
        }, []
    )
    return { sessions, isPending, error, getSessions };
};

