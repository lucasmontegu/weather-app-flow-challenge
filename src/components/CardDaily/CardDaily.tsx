import React from 'react';
import Image from 'next/image';
import { getDayName } from '../../utils/utils';
import { FiCalendar } from 'react-icons/fi';

interface IDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  pop: number;
  rain: number;
  uvi: number;
}

interface ICardDaily {
  daily: Array<IDaily>;
}

const CardDaily: React.FC<ICardDaily> = ({ daily }) => {
  return (
    <div className="Weather__daily--container">
      <div className="Weather__wrapper-next--title">
        <FiCalendar
          size={20}
          color=""
          style={{
            marginRight: '0.5rem',
          }}
        />
        <span>Pronóstico para los próximos 5 días</span>
      </div>
      <div className="Weather__wrapper-next-days">
        {daily
          .map((day) => (
            <div className="Weather__wrapper-next-day--item" key={day.dt}>
              <div className="Weather__daily-item--header">
                <div className="Weather__daily-item--icon">
                  <Image
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt="Icon Weather"
                    width={40}
                    height={40}
                  />
                </div>
                <p className="Weather__daily-item--temp">
                  {parseInt(`${day.temp.day}`)}°
                </p>
                <p className="Weather__daily-item--day">
                  {getDayName(day.dt, 'es', true)}
                </p>
                <p className="Weather__daily-item--max-temp">
                  Max.: {parseInt(`${day.temp.max}`)}°
                </p>
                <p className="Weather__daily-item--min-temp">
                  Min.: {parseInt(`${day.temp.min}`)}°
                </p>
              </div>
            </div>
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
};

export default CardDaily;
