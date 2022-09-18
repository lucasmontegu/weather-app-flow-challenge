import { useState, useEffect } from 'react';

interface IGeoLocationError {
  code: number;
  message: string;
}

interface GeolocationCoordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

type EpochTimeStamp = number;

interface GeolocationPosition {
  readonly coords: GeolocationCoordinates;
  readonly timestamp: EpochTimeStamp;
}

export const useCurrentLocation = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<IGeoLocationError | undefined>(undefined);

  const onChange = ({ coords }: GeolocationPosition) => {
    const { latitude, longitude } = coords;

    setLatitude(latitude);
    setLongitude(longitude);
  };

  const onError = (error: IGeoLocationError) => {
    setError(error);
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError({
        code: 0,
        message: 'La geolocalización no es compatible',
      });
      return;
    }

    const geo = navigator.geolocation;

    const watcher = geo.watchPosition(onChange, onError);

    return () => geo.clearWatch(watcher);
  }, []);

  if (!latitude || !longitude) {
    return { loading: true };
  }

  return { loading: false, latitude, longitude, errorLocation: error };
};
