import Driver from "@/type/Driver";
import Meeting from "@/type/Meeting";
import RaceControl from "@/type/RaceControl";
import Session from "@/type/Session";
import Weather from "@/type/Weather";

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
        weather: (params?: string) => getData<Weather[]>('weather', params),
        raceControl: (params?: string) => getData<RaceControl[]>('race_control', params),
    }
}


export default FormulaService