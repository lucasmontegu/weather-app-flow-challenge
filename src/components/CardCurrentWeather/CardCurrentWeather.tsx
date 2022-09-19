import React from 'react';
import Image from 'next/image';
import { FiDroplet, FiWind } from 'react-icons/fi';
interface ICardCurrentWeather {
  weather: {
    current: {
      dt: number;
      sunrise: number;
      sunset: number;
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
      dew_point: number;
      uvi: number;
      clouds: number;
      visibility: number;
      wind_speed: number;
      wind_deg: number;
      weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
      }>;
    };
  };
}

const CardCurrentWeather: React.FC<ICardCurrentWeather> = ({ weather }) => {
  return (
    <div className="Weather__current-details--container">
      <div className="Weather__current--details">
        <div className="Weather__current-item Weather__current-item--icon">
          <Image
            src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
            alt="Icon Weather"
            width={110}
            height={110}
          />
        </div>
        <div className="Weather__current-item Weather__current-item--temp">
          <h5>{parseInt(`${weather.current.temp}`)}°</h5>
        </div>
        <div className="Weather__current-item Weather__current-item--description">
          <h5>{weather.current.weather[0].description}</h5>
        </div>
        <div className="Weather__current-item Weather__current-item--wind">
          <FiWind size={20} /> <span> {weather.current.wind_speed} m/s</span>
        </div>
        <div className="Weather__current-item Weather__current-item--humidity">
          <FiDroplet size={20} /> <span> {weather.current.humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default CardCurrentWeather;
