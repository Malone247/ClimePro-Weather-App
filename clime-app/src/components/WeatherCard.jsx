import {
  MapPin,
  Eye,
  Wind,
  Droplets,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import {
  formatTemperature,
  formatTime,
  getWeatherIcon,
} from "../utils/weatherutils";

function WeatherCard({ weather, unit }) {
  const iconName = getWeatherIcon(weather.weather[0]);
  const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

  const WeatherStates = [
    {
      icon: Eye,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: "text-blue-300",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weather.wind.speed.toFixed(1)} m/s`,
      color: "text-green-300",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weather.main.humidity}%`,
      color: "text-cyan-300",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
      color: "text-purple-300",
    },
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${formatTemperature(weather.main.feels_like, unit)}°${unit}`,
      color: "text-orange-300",
    },
  ];

  return (
    <div className=" bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500">
      {/* Header */}
      <div className=" flex items-center justify-between mb-8">
        <div className=" flex items-center space-x-3">
          <div className=" p-2 bg-white/10 rounded-full">
            <MapPin className=" w-5 h-5 text-white/80" />
          </div>
          <div>
            <h2 className=" text-white font-semibold text-lg">
              {" "}
              {weather.name}{" "}
            </h2>
            <p className=" text-white/60 text-sm">{weather.sys.country} </p>
          </div>
        </div>
        <div className=" text-right">
          <div className=" text-white/70 text-sm">
            {/* Display Dynamic Date  */}
            {new Date(weather.dt * 1000).toLocaleDateString("en-NG", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="text-white/50 text-xs">
            {/* Display Dynamic Date  */}
            {new Date(weather.dt * 1000).toLocaleTimeString("en-NG", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className=" flex items-center justify-between mb-10">
        <div className="flex-1">
          <div className=" text-7xl font-bold text-white mb-3 tracking-tight">
            {formatTemperature(weather.main.temp, unit)}°
            <span className="text-4xl font-normal text-white/70">{unit}</span>
          </div>
          <div className="text-white text-2xl capitalize mb-2 font-semibold">
            {weather.weather[0].description}
          </div>
          <div className=" flex items-center space-x-4 text-white/60 text-sm">
            <span>H: {formatTemperature(weather.main.temp_max, unit)}° </span>
            <span className="w-1 h-1 rounded-full bg-white/40"></span>

            <span>L: {formatTemperature(weather.main.temp_min, unit)}°</span>
          </div>
        </div>
        <div className="text-white/90 transform hover:scale-110 transition-transform duration-500">
          <IconComponent
            className="w-24 h-24 md:w-28 md:h-28 drop-shadow-2xl"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {WeatherStates.map((state, index) => {
          const StateIcon = state.icon;

          return (
            <div
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-2 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2.5 rounded-xl bg-white/10 group-hover:bg-white/15 transition-all duration-300`}
                >
                  <StateIcon className={`w-4 h-4 ${state.color}`} />
                </div>

                <span className="text-white/60 text-sm font-medium">
                  {state.label}
                </span>
              </div>

              <div className="text-white text-xl font-semibold pl-1">
                {state.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sunrise */}
        <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-orange-400/10 group-hover:bg-orange-400/20 transition-all duration-300">
              <Sunrise className="w-5 h-5 text-orange-300" />
            </div>

            <span className="text-white/60 text-sm font-medium">Sunrise</span>
          </div>

          <div className="text-white text-xl font-semibold">
            {formatTime(weather.sys.sunrise)}
          </div>
        </div>

        {/* Sunset */}
        <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-purple-400/10 group-hover:bg-purple-400/20 transition-all duration-300">
              <Sunset className="w-5 h-5 text-purple-300" />
            </div>

            <span className="text-white/60 text-sm font-medium">Sunset</span>
          </div>

          <div className="text-white text-xl font-semibold">
            {formatTime(weather.sys.sunset)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
