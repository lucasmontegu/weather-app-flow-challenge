import React, { useState, useEffect } from 'react';
import Container from '../components/Container/Container';
import Layout from '../components/Layout/Layout';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { FiNavigation } from 'react-icons/fi';
import { cities, ICity } from '../libs/cities.list';
import Backdrop from '../components/Backdrop/Backdrop';
import Select from '../components/Select/Select';
import CardDaily from '../components/CardDaily/CardDaily';
import { getWeatherData } from '../services/getWeather';
import { useQuery } from '@tanstack/react-query';
import CardCurrentWeather from '../components/CardCurrentWeather/CardCurrentWeather';

interface IGeoLocation {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const { latitude, longitude } = useCurrentLocation();
  const [cityLocationName, setCityLocationName] = useState<string>('');
  const [city, setCity] = useState<ICity | null>(null);
  const [position, setPosition] = useState<IGeoLocation>();

  useEffect(() => {
    if (latitude && longitude) {
      setPosition({ latitude, longitude });
    }
  }, [latitude, longitude]);

  const { data: weather, isLoading } = useQuery(
    ['weather', position],
    () => getWeatherData(position),
    {
      enabled: !!position,
      cacheTime: 1000 * 60 * 300,
      staleTime: 1000 * 30 * 300,
    }
  );

  const newCities: Array<ICity> = [...cities];

  !!latitude &&
    longitude &&
    newCities.push({
      id: cities.length + 1,
      name: 'Mi ubicación',
      country: 'Current Location',
      coord: {
        lat: latitude,
        lon: longitude,
      },
    });

  useEffect(() => {
    if (weather) {
      const arrTimezone = weather.timezone.split('/');
      const city = arrTimezone[arrTimezone.length - 1];
      setCityLocationName(city);
    }
  }, [weather]);

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
      {isLoading ? (
        <Backdrop show={isLoading} />
      ) : (
        <Container>
          <div className="Weather__container">
            {weather && (
              <div className="Weather__current">
                <div className="Weather__current--header">
                  <div className="Weather__current--location">
                    <h4 className="Weather__current--location-name">
                      {city ? city.name : cityLocationName}
                      <FiNavigation
                        style={{
                          marginLeft: '0.5rem',
                        }}
                        size={20}
                      />{' '}
                    </h4>
                  </div>

                  <div className="Weather__location--container">
                    <Select
                      value={city}
                      options={newCities.reverse()}
                      handleChange={handleCityChange}
                    />
                  </div>
                </div>
                <CardCurrentWeather weather={weather} />
              </div>
            )}

            {weather && !!weather.daily.length && (
              <CardDaily daily={weather.daily} />
            )}
          </div>
        </Container>
      )}
    </Layout>
  );
};

export default Home;
