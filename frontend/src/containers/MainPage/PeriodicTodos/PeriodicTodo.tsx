import React  from 'react';
import { PeriodicTodo as Todo } from '../../../types';
import { makeStyles, Typography } from '@material-ui/core';
import TodoCard from '../components/TodoCard'
import { Loop, CheckCircleOutline } from '@material-ui/icons'

const useStyles = makeStyles({
  dayContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  loop: {
    display: 'flex',
    alignItems: 'center'
  },
  done: {
    display: 'flex',
    alignItems: 'center'
  }
})
interface Props {
  todo: Todo,
  onDoneClick: (todo: Todo) => void
  onCardClick: (todo: Todo) => void
}

const PeriodicTodo: React.FC<Props> = ({ todo, onDoneClick, onCardClick }) => {
  const classes = useStyles()
  const generateAdvice = (daysLeftToDesired: number | null) => {
    if (daysLeftToDesired === null) {
      return null
    } else if (daysLeftToDesired >= 1) {
      return `次回まであと${daysLeftToDesired}日`
    } else if (daysLeftToDesired === 0) {
      return `今日やりましょう`
    } else {
      return `期限を${-daysLeftToDesired}日過ぎています`
    }
  }
  return (
    <TodoCard onCardClick={() => {onCardClick(todo)}} onDoneClick={(e: React.MouseEvent) => {e.stopPropagation();onDoneClick(todo)}}>
      <Typography variant='h5'>
        {todo.name} 
      </Typography>
      <div className={classes.dayContainer}>
        <Typography className={classes.loop} color='textSecondary'>
          <Loop />{todo.desiredIntervalDays}日 
        </Typography>
        <Typography className={classes.done} color='textSecondary'>
          { (todo.lastUpdatedDistance !== null) ?
            <><CheckCircleOutline />{`${todo.lastUpdatedDistance === 0 ? '今日' : `${todo.lastUpdatedDistance}日前`}`}</>
            : '未実施'
          }
        </Typography>
      </div>
      <Typography variant='body1' color={todo.daysLeftToDesired && (todo.daysLeftToDesired <= 0) ? 'secondary' : 'inherit'}>
        {generateAdvice(todo.daysLeftToDesired)}
      </Typography>
    </TodoCard>
  )
}

export default PeriodicTodo