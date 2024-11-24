import Driver from "@/type/Driver";
import Meeting from "@/type/Meeting";
import Session from "@/type/Session";

const FormulaService = () => {
    const BASE_URL = 'https://api.openf1.org/v1/';

    async function getData<T>(arg: string, params?: string): Promise<T> {
        const res = await fetch(`${BASE_URL}${arg}?${params}`)
        return res.json()
    }
    return {
        meetings: (params?: string) => getData<Meeting[]>('meetings', params),
        sessions: (params?: string) => getData<Session[]>('sessions', params),
        drivers: (params?: string) => getData<Driver[]>('drivers', params),
    }
}


export default FormulaService