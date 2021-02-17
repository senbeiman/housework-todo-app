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
  const [datetime, setDatetime] = useState([new Date(), new Date()])
  const date = format(datetime[1], 'yyyy/M/d(E)', { locale: ja })
  const time = format(datetime[1], 'HH:mm:ss', { locale: ja })
 
  useEffect(() => {
    if (getDay(datetime[0]) !== getDay(datetime[1])) {
      onDayChange(datetime[1])
    }
  }, [datetime])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDatetime([datetime[1], new Date()])
    }, 1000)
    return () => {clearInterval(intervalId)}
  }, [])
  return (
    <div className={classes.container}>
      <Typography variant='h5'>{date}</Typography>
      <Typography variant='h3'>{time}</Typography>
    </div>
  )
}

export default Clock;