import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } from '../../redux/weatherSlice';
import axios from 'axios';

export default function CityDetail() {
  const router = useRouter();
  const { city } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    if (city) {
      const fetchData = async () => {
        dispatch(fetchWeatherStart());
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
          );
          dispatch(fetchWeatherSuccess(response.data));
        } catch (err) {
          dispatch(fetchWeatherFailure(err.message));
        }
      };
      fetchData();
    }
  }, [city, dispatch]);

  return (
    <div>
      <h1>Weather for {city}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <p>Temperature: {Math.round(data.main.temp - 273.15)}°C</p>
          <p>Condition: {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}