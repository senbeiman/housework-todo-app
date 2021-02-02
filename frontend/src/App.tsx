import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import CreateTodo from './components/CreateTodo';
import MainPage from './components/MainPage';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Noto Sans',
      'Noto Sans CJK JP',
      'sans-serif'
    ].join(',')
  }
})
const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  )
}

export default App;
