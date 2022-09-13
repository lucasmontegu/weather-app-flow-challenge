import { useState, useEffect } from 'react';
import Container from '../components/Container/Container';
import Layout from '../components/Layout/Layout';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { useWeather } from '../hooks/useWeather';
import { Location } from 'iconsax-react';
import { getDayName } from '../utils/utils';
import { cities, ICity } from '../libs/cities.list';
import Backdrop from '../components/Backdrop/Backdrop';
import Select from '../components/Select/Select';

interface IGeoLocation {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const [position, setPosition] = useState<IGeoLocation | null>({
    latitude: -31.4320479,
    longitude: -64.1845319,
  });

  // const { location, errorLocation } = useCurrentLocation();

  const { weather, error, isLoading } = useWeather(position);

  // const [currentLocation, setCurrentLocation] = useState<ICity | null>(null);
  const [cityLocationName, setCityLocationName] = useState<string>('');

  const [city, setCity] = useState<ICity | null>(null);

  console.log('City: ', city);

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

  /* const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredCities = cities.filter((city) => {
      return city.name.toLowerCase().includes(search.toLowerCase());
    });
    setCityList(filteredCities);
  }; */

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
                    <Location size={20} /> {cityLocationName}
                  </h4>
                </div>

                <div className="Weather__location--container">
                  <Select options={cities} value={city} onSelect={setCity} />
                  {/* <select className="Weather__location--select">
                    {cities
                      .map((city) => (
                        <option
                          className="Weather__location--option"
                          key={city.id * 1992}
                          value={city.id}
                        >
                          {city.name}
                        </option>
                      ))
                      .reverse()}
                  </select> */}
                </div>
              </div>
              <div>
                <div className="Weather__current-day__temp">
                  <span>{weather.current.temp}°</span>
                  <span>{weather.current.weather[0].description}</span>
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
                    <div key={index * 2991} style={{ display: 'flex' }}>
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
};

export default Home;
