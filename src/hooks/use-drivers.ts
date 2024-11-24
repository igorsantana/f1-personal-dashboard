import FormulaService from "@/services/FormulaService";
import Driver from "@/type/Driver";
import { useState, useCallback } from "react";


export const useDrivers = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const svc = FormulaService()

    const getDrivers = useCallback(
        async (key: number) => {
            try {
                setIsPending(true)
                const json = await svc.drivers(`session_key=${key}`)
                setDrivers(json)
            } catch (error) {
                setError(`${error}`)
            } finally {
                setIsPending(false)
            }
        }, []
    )
    return { drivers, isPending, error, getDrivers };
};

