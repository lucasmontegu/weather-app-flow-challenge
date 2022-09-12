import { useState, useEffect } from 'react';
import Container from '../components/Container/Container';
import Layout from '../components/Layout/Layout';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { useWeather } from '../hooks/useWeather';
import { Location } from 'iconsax-react';
import { getDayName } from '../utils/utils';

interface IGeoLocation {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const [cityName, setCityName] = useState<string>('');
  const { location, errorLocation } = useCurrentLocation();
  console.log(errorLocation);
  console.log('location', location);

  const position: IGeoLocation = {
    latitude: -31.4320479,
    longitude: -64.1845319,
  };

  const { weather, error, isLoading } = useWeather(position);

  if (weather) {
    console.log(weather);
    console.log(error);
    console.log(isLoading);
  }

  useEffect(() => {
    if (weather) {
      const arrTimezone = weather.timezone.split('/');
      const city = arrTimezone[arrTimezone.length - 1];
      setCityName(city);
    }
  }, [weather]);

  /* useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;


      if(weather) {
        console.log(weather);
      } else {
        console.log(error);
      }
    }
  }, [useWeather, location]); */

  if (!location && !error) {
    return (
      <Layout>
        <Container>
          <p>Getting location...</p>
        </Container>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Container>
          <div
            style={{
              border: '1px solid #333',
              padding: '1rem',
              borderRadius: '0.5rem',
            }}
          >
            <div>
              {weather && (
                <div>
                  <div>
                    <Location size="32" color="#333" />
                    <h2 style={{ marginLeft: '16px' }}>
                      {cityName || 'No se pudo obtener la ciudad'}
                    </h2>
                  </div>
                  <h1>{weather.current.temp}</h1>
                  <h1>{weather.current.weather[0].description}</h1>
                </div>
              )}
            </div>
            <div>
              {weather &&
                !!weather.daily.length &&
                weather.daily
                  .map((day, index) => {
                    return (
                      <div key={index * 12345678} style={{ display: 'flex' }}>
                        <p style={{ marginRight: '12px' }}>{day.temp.day}</p>
                        <p style={{ marginRight: '12px' }}>
                          {day.weather[0].description}
                        </p>
                        <p style={{ marginRight: '12px' }}>
                          {getDayName(day.dt, 'es', true)}
                        </p>
                      </div>
                    );
                  })
                  .slice(0, 5)}
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
};

export default Home;
