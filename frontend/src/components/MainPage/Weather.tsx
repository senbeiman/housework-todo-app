import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const WEATHER_FETCH_PERIOD = 1000 * 60 * 10

const useStyles = makeStyles({
  container: {
    display: 'flex'
  },
  mainTempContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  subTempContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem'
  },
  mainTemp: {
    fontSize: '1.5rem'
  },
  feelingTemp: {
    fontSize: '1rem'
  },
  maxTemp: {
    color: 'red'
  },
  minTemp: {
    color: 'blue'
  }
})
const Weather: React.FC = () => {
  const classes = useStyles()
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
        feelingTemp: Math.round(data.main.feels_like),
        temp: Math.round(data.main.temp),
        tempMax: Math.round(data.main.temp_max),
        tempMin: Math.round(data.main.temp_min),
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
    <div className={classes.container}>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      <div className={classes.mainTempContainer}>
        <div className={classes.mainTemp}>{weather.temp}℃</div>
        <div className={classes.feelingTemp}>体感{weather.feelingTemp}℃</div>
      </div>
      <div className={classes.subTempContainer}>
        <div className={classes.maxTemp}>
          {weather.tempMax}℃
        </div>
        <div className={classes.minTemp}>
          {weather.tempMin}℃
        </div>
      </div>
      <div className={classes.subTempContainer}>
        <div>
          {weather.humidity}%
        </div>
        <div>
          {weather.windSpeed}m/s
        </div>
      </div>
    </div>
  )
}

export default Weather;
