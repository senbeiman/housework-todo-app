import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Clock: React.FC = () => {
  const [time, setTime] = useState('');
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = format(new Date(), 'yyyy/MM/dd(E) HH:mm:ss')
      setTime(newTime)
    }, 1000)
    return () => {clearInterval(intervalId)}
  }, [time])
  return <div>{time}</div>
}

export default Clock;