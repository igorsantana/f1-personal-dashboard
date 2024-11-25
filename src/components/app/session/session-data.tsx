import { useFormulaContext } from "@/hooks/use-formula";
import { useWeather } from "@/hooks/use-weather";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Slider } from "../../ui/slider";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  Droplets,
  ThermometerSun,
} from "lucide-react";
import moment from "moment";

export default function SessionData() {
  const state = useFormulaContext();
  const { weather, getWeather } = useWeather();
  const [weatherStep, setWeatherStep] = useState<number>(0);
  useEffect(() => {
    if (state.selectedSession) {
      getWeather(
        state.selectedSession.session_key,
        state.selectedSession?.meeting_key
      );
    }
    setWeatherStep(0);
  }, [state.selectedSession]);

  const formatDate = (dt: string) => moment(dt).format("HH:mm:ss");
  const showTS = () => {
    if (!weather || !weather[weatherStep]) return;
    return (
      <span className="text-center block leading-8	font-semibold	">
        {formatDate(weather[weatherStep].date)}
      </span>
    );
  };

  const windDirection = (dir: number) => {
    if ((dir > 337.5 && dir < 360) || (dir > 0 && dir < 22.5))
      return <ArrowUp />;
    if (dir > 22.5 && dir < 67.5) return <ArrowUpRight />;
    if (dir > 67.5 && dir < 112.5) return <ArrowRight />;
    if (dir > 112.5 && dir < 157.5) return <ArrowDownRight />;
    if (dir > 157.5 && dir < 202.5) return <ArrowDown />;
    if (dir > 202.5 && dir < 247.5) return <ArrowDownLeft />;
    if (dir > 247.5 && dir < 292.5) return <ArrowLeft />;
    return <ArrowUpLeft />;
  };

  return (
    <div>
      <Card className="w-4/12">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <ThermometerSun /> Weather Information{" "}
            </div>
            {showTS()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            defaultValue={[weatherStep]}
            max={weather.length - 1}
            step={1}
            value={[weatherStep]}
            onValueChange={([e]) => setWeatherStep(e)}
          />
          <div className="mt-4">
            <div>
              <Droplets />
              {weather[weatherStep] && weather[weatherStep].humidity + "%"}
            </div>
            <div>
              {weather[weatherStep] &&
                windDirection(weather[weatherStep].wind_direction)}
            </div>
            {"Wind Direction"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
