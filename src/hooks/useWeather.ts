import { useState, useEffect } from 'react';

interface IGeoLocation {
  latitude: number;
  longitude: number;
}

interface IWeatherResponse {
  current: any;
  daily: any[];
  hourly: any[];
  lat: number;
  lon: number;
  minutely: any[];
  timezone: string;
  timezone_offset: number;
}

export const useWeather = (location: IGeoLocation | null) => {
  const [weather, setWeather] = useState<IWeatherResponse | null>(null);
  const [error, setError] = useState<unknown | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!location) {
      return;
    }

    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.WEATHER_URI}?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.WEATHER_KEY}&units=metric&lang=es`
        );
        const data: IWeatherResponse = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchWeather();
  }, [location]);

  return { weather, error, isLoading };
};
