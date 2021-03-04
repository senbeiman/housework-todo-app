import React, { useState, useEffect } from 'react';
import { format, getDay } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import { ja } from 'date-fns/locale'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  },
})
interface Props {
  onDayChange: (datetime: Date) => void
}
const Clock: React.FC<Props> = ({ onDayChange }) => {
  const classes = useStyles()
  const [datetime, setDatetime] = useState(new Date())
  const [delayedDatetime, setDelayedDatetime] = useState(new Date())
  const date = format(datetime, 'yyyy/M/d(E)', { locale: ja })
  const time = format(datetime, 'HH:mm:ss', { locale: ja })
 
  const [debugTime, setDebugTime] = useState(new Date())
  useEffect(() => {
    if (getDay(datetime) !== getDay(delayedDatetime)) {
      onDayChange(datetime)
      setDebugTime(datetime)
    }
    setDelayedDatetime(datetime)
  }, [datetime])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDatetime(new Date())
    }, 1000)
    return () => {clearInterval(intervalId)}
  }, [])
  return (
    <div className={classes.container}>
      <Typography variant='h5'>{date}</Typography>
      <Typography variant='h3'>{time}</Typography>
      <Typography variant='caption'>onDayChange(debug): {format(debugTime, 'M/d(E) HH:mm:ss')}</Typography>
    </div>
  )
}

export default Clock;