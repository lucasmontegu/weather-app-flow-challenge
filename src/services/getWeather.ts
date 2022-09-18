import axios from 'axios';

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

export const getWeatherData = async (location: IGeoLocation) => {
  const { data } = await axios.get<IWeatherResponse>(
    `${process.env.WEATHER_URI}?lat=${location?.latitude}&lon=${location?.longitude}&appid=${process.env.WEATHER_KEY}&units=metric&lang=es`
  );
  return data;
};
