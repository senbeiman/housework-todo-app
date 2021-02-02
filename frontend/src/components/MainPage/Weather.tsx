import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'

const WEATHER_FETCH_PERIOD = 1000 * 60 * 10

const useStyles = makeStyles({
  mainTempContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  subTempContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  maxTemp: {
    color: 'red',
    marginBottom: 10
  },
  minTemp: {
    color: 'blue',
  },
  humidity: {
    marginBottom: 10
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
      const url = process.env.REACT_APP_WEATHER_URL
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
  }, [])
  return (
    <>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      <div className={classes.mainTempContainer}>
        <Typography variant='h4'>{weather.temp}℃</Typography>
        <Typography variant='h5'>体感{weather.feelingTemp}℃</Typography>
      </div>
      <div className={classes.subTempContainer}>
        <Typography variant='h5' className={classes.maxTemp}>
          {weather.tempMax}℃
        </Typography>
        <Typography variant='h5' className={classes.minTemp}>
          {weather.tempMin}℃
        </Typography>
      </div>
      <div className={classes.subTempContainer}>
        <Typography variant='h5' className={classes.humidity}>
          {weather.humidity}%
        </Typography>
        <Typography variant='h5'>
          {weather.windSpeed}m/s
        </Typography>
      </div>
    </>
  )
}

export default Weather;
