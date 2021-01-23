import React from 'react';
import Clock from './components/Clock';
import Weather from './components/Weather';

const App: React.FC = () => {
  return (
    <div>
      <Clock />
      <Weather />
    </div>
  )
}

export default App;
