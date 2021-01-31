import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_FETCH_PERIOD = 1000 * 60 * 10

const Weather: React.FC = () => {
  const [weather, setWeather] = useState({
    feelingTemp: 0,
    temp: 0,
    tempMin: 0,
    tempMax: 0,
    humidity: 0,
    windSpeed: 0,
    icon: ''
  });
 
  useEffect(() => {
    const getWeather = async () => {
      const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_WEATHER_URL_PROD : process.env.REACT_APP_WEATHER_URL_DEV
      if (!url) {
        throw new Error('no url for weather set')
      }
      const { data } = await axios.get(url)
      setWeather({
        feelingTemp: data.main.feels_like,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon
      })
    }
    getWeather()
    const intervalId = setInterval(getWeather, WEATHER_FETCH_PERIOD)
    return () => {clearInterval(intervalId)}
  }, [weather])
  return (
    <div>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      <div>feels like {weather.feelingTemp}℃</div>
      <div>current: {weather.temp}℃ max: {weather.tempMax}℃ min: {weather.tempMin}℃</div>
      <div>humidity: {weather.humidity}% wind speed: {weather.windSpeed}m/s</div>
    </div>
  )
}

export default Weather;
