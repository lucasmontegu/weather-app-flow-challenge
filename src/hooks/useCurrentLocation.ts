import { useState, useEffect } from 'react';

interface IGeoLocation {
  latitude: number;
  longitude: number;
}

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
  const [location, setLocation] = useState<IGeoLocation | undefined>(undefined);
  const [error, setError] = useState<IGeoLocationError | undefined>(undefined);

  const onChange = ({ coords }: GeolocationPosition) => {
    const { latitude, longitude } = coords;
    setLocation({ latitude, longitude });
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

  return { location, errorLocation: error };
};
