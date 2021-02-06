import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import { fromUnixTime } from 'date-fns/esm';
import { format } from 'date-fns';

const WEATHER_FETCH_PERIOD = 1000 * 60 * 10

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    marginRight: -5,
    marginTop: 5,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  parametersContainer: {
    display: 'flex',
  },
  mainTempContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  subTempContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  subInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  typography: {
    margin: 5
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
    icon: '',
    updatedAt: ''
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
        icon: data.weather[0].icon,
        updatedAt:format(fromUnixTime(data.dt), 'M/d HH:mm')
      })
    }
    getWeather()
    const intervalId = setInterval(getWeather, WEATHER_FETCH_PERIOD)
    return () => {clearInterval(intervalId)}
  }, [])
  return (
    <div className={classes.container}>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      <div className={classes.textContainer}>
        <div className={classes.parametersContainer}>
          <div className={classes.mainTempContainer}>
            <Typography className={classes.typography} variant='h4'>{weather.temp}℃</Typography>
            <Typography className={classes.typography} variant='body1'>体感{weather.feelingTemp}℃</Typography>
          </div>
          <div className={classes.subTempContainer}>
            <Typography className={classes.typography} variant='h5' color='secondary'>
              {weather.tempMax}℃
            </Typography>
            <Typography className={classes.typography} variant='h5' color='primary'>
              {weather.tempMin}℃
            </Typography>
          </div>
          <div className={classes.subInfoContainer}>
            <Typography className={classes.typography} variant='h5'>
              {weather.humidity}%
            </Typography>
            <Typography className={classes.typography} variant='h5'>
              {weather.windSpeed}m/s
            </Typography>
          </div>
        </div>
        <div>
          <Typography className={classes.typography} variant='body1' color='textSecondary'>
            {weather.updatedAt}時点
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Weather;
