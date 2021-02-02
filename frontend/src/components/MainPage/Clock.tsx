import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import { ja } from 'date-fns/locale'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%'
  },
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
  }, [])
  return (
    <div className={classes.container}>
      <Typography variant='h5'>{date}</Typography>
      <Typography variant='h3'>{time}</Typography>
    </div>
  )
}

export default Clock;