import RaceControl from "./cards/race-control";
import WeatherCard from "./cards/weather-card";

export default function SessionData() {
  return (
    <div className="flex gap-4 ">
      <WeatherCard />
      <RaceControl />
    </div>
  );
}
