import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateTodo from './components/CreateTodo';
import MainPage from './components/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/create_periodic'>
          <CreateTodo todoType={'periodic'}/>
        </Route>
        <Route path='/create_temporary'>
          <CreateTodo todoType={'temporary'}/>
        </Route>
        <Route path='/'>
          <MainPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
