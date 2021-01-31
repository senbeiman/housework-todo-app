import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateTodo from './components/CreateTodo';
import Header from './components/MainPage/Header';
import MainPage from './components/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/create'>
          <CreateTodo />
        </Route>
        <Route path='/'>
          <MainPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
