/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    WEATHER_KEY: '233abe2910c520121c22fd2a36886355',
    WEATHER_URI: 'https://api.openweathermap.org/data/3.0/onecall',
  },
};

module.exports = nextConfig;
