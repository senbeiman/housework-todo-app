import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale'

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {clearInterval(intervalId)}
  }, [time])
  return <div>{format(time, 'yyyy/MM/dd(E) HH:mm:ss', { locale: ja })}</div>
}

export default Clock;