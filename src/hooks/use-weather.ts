import FormulaService from "@/services/FormulaService";
import Weather from "@/type/Weather";
import { useState, useCallback } from "react";


export const useWeather = () => {
    const [weather, setWeather] = useState<Weather[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const svc = FormulaService()

    const getWeather = useCallback(
        async (sk: number, mk:number) => {
            try {
                setIsPending(true)
                const json = await svc.weather(`session_key=${sk}&meeting_key=${mk}`)
                setWeather(json)
            } catch (error) {
                setError(`${error}`)
            } finally {
                setIsPending(false)
            }
        }, [svc]
    )
    return { weather, isPending, error, getWeather };
};

