import { makeStyles } from '@material-ui/core';
import React from 'react';
import Clock from './Clock';
import PeriodicTodos from './PeriodicTodos';
import TemporaryTodos from './TemporaryTodos';
import Trash from './Trash';
import Weather from './Weather';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  headContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
  },
  todosContainer: {
    display: 'flex',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'space-between'
  }

})
const MainPage: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.headContainer}>
        <Clock />
        <Weather />
      </div>
      <Trash />
      <div className={classes.todosContainer}>
        <PeriodicTodos />
        <TemporaryTodos />
      </div>
    </div>
  )
}

export default MainPage;