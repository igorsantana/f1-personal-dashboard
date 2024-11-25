import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFormulaContext } from "@/hooks/use-formula";
import { useWeather } from "@/hooks/use-weather";
import { Slider } from "@/components/ui/slider";
import {
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  ArrowDownRight,
  ArrowDown,
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpLeft,
  CloudRain,
  Sun,
  ThermometerSun,
} from "lucide-react";
import moment from "moment";
import { useState, useEffect } from "react";

export default function WeatherCard() {
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

  const windDirection = (dir: number) => {
    if ((dir > 337.5 && dir < 360) || (dir > 0 && dir < 22.5))
      return <ArrowUp size={16} />;
    if (dir > 22.5 && dir < 67.5) return <ArrowUpRight size={16} />;
    if (dir > 67.5 && dir < 112.5) return <ArrowRight size={16} />;
    if (dir > 112.5 && dir < 157.5) return <ArrowDownRight size={16} />;
    if (dir > 157.5 && dir < 202.5) return <ArrowDown size={16} />;
    if (dir > 202.5 && dir < 247.5) return <ArrowDownLeft size={16} />;
    if (dir > 247.5 && dir < 292.5) return <ArrowLeft size={16} />;
    return <ArrowUpLeft size={16} />;
  };

  const rainfaill = (rf: number) => {
    if (rf === 1) return <CloudRain size={16} />;
    return <Sun size={16} />;
  };

  const showTS = () => {
    if (!weather || !weather[weatherStep]) return;
    return (
      <span className="text-center block leading-8	font-semibold	">
        {formatDate(weather[weatherStep].date)}
      </span>
    );
  };
  
  return (
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
        <div className="mt-4 grid grid-cols-3 grid-rows-2	gap-2 gap-y-4	">
          <div className="text-xs flex flex-col items-center">
            <span>
              {weather[weatherStep] &&
                weather[weatherStep].air_temperature + "ºC"}
            </span>
            <span>Air temperature</span>
          </div>
          <div className="text-xs flex flex-col items-center">
            <span>
              {weather[weatherStep] &&
                weather[weatherStep].track_temperature + "ºC"}
            </span>
            <span>Track temperature</span>
          </div>
          <div className="text-xs flex flex-col items-center">
            {weather[weatherStep] && rainfaill(weather[weatherStep].rainfall)}
            {weather[weatherStep] && weather[weatherStep].rainfall === 0
              ? "Clear"
              : "Raining"}
          </div>
          <div className="text-xs flex flex-col items-center">
            <span>
              {weather[weatherStep] && weather[weatherStep].humidity + "%"}
            </span>
            <span>Humidity</span>
          </div>
          <div className="text-xs flex flex-col items-center">
            <span>
              {weather[weatherStep] && weather[weatherStep].wind_speed + "m/s"}
            </span>
            <span>Wind Speed</span>
          </div>
          <div className="text-xs flex flex-col items-center">
            {weather[weatherStep] &&
              windDirection(weather[weatherStep].wind_direction)}
            {"Wind Direction"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
