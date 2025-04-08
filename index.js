import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } from '../redux/weatherSlice';
import axios from 'axios';

export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchWeatherStart());
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        dispatch(fetchWeatherSuccess(response.data));
      } catch (err) {
        dispatch(fetchWeatherFailure(err.message));
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>CryptoWeather Nexus</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h2>Weather in London</h2>
          <p>Temperature: {Math.round(data.main.temp - 273.15)}°C</p>
          <p>Condition: {data.weather[0].description}</p>
        </div>
      )}
      <p>Check city or crypto details using the links!</p>
    </div>
  );
}