/* import { useEffect } from 'react'; */
import Container from '../components/Container/Container';
import Layout from '../components/Layout/Layout';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { useWeather } from '../hooks/useWeather';

const Home = () => {
  const { location, errorLocation } = useCurrentLocation();
  console.log(errorLocation);
  const { weather, error, isLoading } = useWeather(location);

  if (weather) {
    console.log(weather);
    console.log(error);
    console.log(isLoading);
  }

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
          <div>
            <div>
              {weather && (
                <div>
                  <h1>{weather.current.temp}</h1>
                  <h1>{weather.current.weather[0].description}</h1>
                </div>
              )}
            </div>
            <div>
              {weather &&
                !!weather.daily.length &&
                weather.daily.map((day, index) => {
                  return (
                    <div key={index * 12345678}>
                      <p>{day.temp.day}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
};

export default Home;
