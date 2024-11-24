import FormulaService from "@/services/FormulaService";
import Meeting from "@/type/Meeting";
import { useState, useCallback } from "react";

export const useMeetings = () => {
	const [meetings, setMeetings] = useState<Meeting[]>([]);
	const [isPending, setIsPending] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const svc = FormulaService()
	
	const getMeetings = useCallback(
		async (year: number) => {
			try {
				setIsPending(true)
				const json = await svc.meetings(`year=${year}`)
				setMeetings(json)
			} catch (error) {
				setError(`${error}`)
			} finally {
				setIsPending(false)
			}
		}, []
	)
	return { meetings, isPending, error, getMeetings };
};

