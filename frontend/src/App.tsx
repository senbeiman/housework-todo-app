import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
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
      <MainPage />
    </MuiThemeProvider>
  )
}

export default App;
