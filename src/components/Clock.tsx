import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Clock: React.FC = () => {
  const [time, setTime] = useState('');
 
  useEffect(() => {
    setInterval(() => {
      const time = format(new Date(), 'yyyy/MM/dd(E) HH:mm:ss')
      setTime(time)
    }, 1000)
  }, [])
  return <div>{time}</div>
}

export default Clock;