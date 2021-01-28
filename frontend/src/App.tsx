import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Clock from './components/Clock';
import CreateTodo from './components/CreateTodo';
import Header from './components/Header';
import PeriodicTodos from './components/PeriodicTodos';
import TemporaryTodos from './components/TemporaryTodos';
import Trash from './components/Trash';
import Weather from './components/Weather';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/create'>
          <CreateTodo />
        </Route>
        <Route path='/'>
          <Clock />
          <Weather />
          <Trash />
          <PeriodicTodos />
          <TemporaryTodos />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
