import React, { useState, useEffect } from 'react';
import Container from '../components/Container/Container';
import Layout from '../components/Layout/Layout';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { useWeather } from '../hooks/useWeather';
import { Drop, Location, Wind } from 'iconsax-react';
import { getDayName } from '../utils/utils';
import { cities, ICity } from '../libs/cities.list';
import Backdrop from '../components/Backdrop/Backdrop';
import Select from '../components/Select/Select';
import Image from 'next/image';

interface IGeoLocation {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const { location, errorLocation } = useCurrentLocation();
  const [cityLocationName, setCityLocationName] = useState<string>('');
  const [city, setCity] = useState<ICity | null>(null);
  const [cityLocation, setCityLocation] = useState<IGeoLocation | null>(null);
  const [position, setPosition] = useState<IGeoLocation | null>(null);

  const { weather, error, isLoading } = useWeather(position);

  useEffect(() => {
    if (location) {
      setCityLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      setPosition({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [location]);

  const newCities: Array<ICity> = [...cities];

  cityLocation &&
    newCities.push({
      id: cities.length + 1,
      name: 'Mi ubicación',
      country: 'Current Location',
      coord: {
        lat: cityLocation.latitude,
        lon: cityLocation.longitude,
      },
    });

  console.log('Location: ', location);
  console.log('Error: ', errorLocation);
  console.log('New Cities: ', newCities);
  console.log('Error: ', error);

  useEffect(() => {
    if (
      weather &&
      location &&
      weather.lat === location?.latitude &&
      weather.lon === location?.longitude
    ) {
      const arrTimezone = weather.timezone.split('/');
      const city = arrTimezone[arrTimezone.length - 1];
      setCityLocationName(city);
    }
  }, [weather, location]);

  console.log('City Location Name: ', cityLocationName);

  useEffect(() => {
    if (city) {
      setPosition({
        latitude: city.coord.lat,
        longitude: city.coord.lon,
      });
    }
  }, [city, setPosition]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = newCities.find(
      (option) => option.id === Number(e.target.value)
    );
    if (city) {
      setCity(city);
    }
  };

  return (
    <Layout>
      <Backdrop show={isLoading} />
      <Container>
        <div className="Weather__container">
          {weather && (
            <div className="Weather__current">
              <div className="Weather__current--header">
                <div className="Weather__current--location">
                  <h4 className="Weather__current--location-name">
                    <Location size={20} /> {city ? city.name : cityLocationName}
                  </h4>
                </div>

                <div className="Weather__location--container">
                  <Select
                    options={newCities.reverse()}
                    handleChange={handleCityChange}
                  />
                </div>
              </div>
              <div className="Weather__current-details--container">
                <div className="Weather__current--details">
                  <div className="Weather__current-item Weather__current-item--icon">
                    <Image
                      src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                      alt="Icon Weather"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="Weather__current-item Weather__current-item--temp">
                    <h5>{parseInt(weather.current.temp)}°</h5>
                  </div>
                  <div className="Weather__current-item Weather__current-item--description">
                    <h5>{weather.current.weather[0].description}</h5>
                  </div>
                  <div className="Weather__current-item Weather__current-item--wind">
                    <div>
                      <Wind size="32" color="#f3f3f3" />
                    </div>
                    <div>
                      <h5>{weather.current.wind_speed} m/s</h5>
                    </div>
                  </div>
                  <div className="Weather__current-item Weather__current-item--humidity">
                    <div>
                      <Drop size="32" color="#f3f3f3" />
                    </div>
                    <div>
                      <h5>{weather.current.humidity}%</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="Weather__wrapper-next-days">
            {weather &&
              !!weather.daily.length &&
              weather.daily
                .map((day, index) => {
                  return (
                    <div
                      key={index * 2991}
                      className="Weather__wrapper-next-day--item"
                    >
                      <Image
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt="Icon Weather"
                        width={50}
                        height={50}
                      />
                      <p>{parseInt(day.temp.day)}°</p>
                      <p>{getDayName(day.dt, 'es', true)}</p>
                    </div>
                  );
                })
                .slice(0, 5)}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
