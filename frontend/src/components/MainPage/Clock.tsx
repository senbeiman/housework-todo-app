import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { ja } from 'date-fns/locale'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  date: {
    fontSize: '1rem'
  },
  time: {
    fontSize: '2rem'
  }
})
const Clock: React.FC = () => {
  const classes = useStyles()
  const [datetime, setDatetime] = useState(new Date())
  const date = format(datetime, 'yyyy/MM/dd(E)', { locale: ja })
  const time = format(datetime, 'HH:mm:ss', { locale: ja })
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDatetime(new Date())
    }, 1000)
    return () => {clearInterval(intervalId)}
  }, [time])
  return (
    <div className={classes.container}>
      <div className={classes.date}>{date}</div>
      <div className={classes.time}>{time}</div>
    </div>
  )
}

export default Clock;