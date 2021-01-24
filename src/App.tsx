import React from 'react';
import Clock from './components/Clock';
import PeriodicalTodos from './components/PeriodicalTodos';
import Trash from './components/Trash';
import Weather from './components/Weather';

const App: React.FC = () => {
  return (
    <div>
      <Clock />
      <Weather />
      <Trash />
      <PeriodicalTodos />
    </div>
  )
}

export default App;
