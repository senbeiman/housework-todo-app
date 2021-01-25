import React from 'react';
import Clock from './components/Clock';
import PeriodicTodos from './components/PeriodicTodos';
import TemporaryTodos from './components/TemporaryTodos';
import Trash from './components/Trash';
import Weather from './components/Weather';

const App: React.FC = () => {
  return (
    <div>
      <Clock />
      <Weather />
      <Trash />
      <PeriodicTodos />
      <TemporaryTodos />
    </div>
  )
}

export default App;
