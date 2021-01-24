import React from 'react';
import Clock from './components/Clock';
import Trash from './components/Trash';
import Weather from './components/Weather';

const App: React.FC = () => {
  return (
    <div>
      <Clock />
      <Weather />
      <Trash />
    </div>
  )
}

export default App;
