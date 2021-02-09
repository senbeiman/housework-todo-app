import React  from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { TemporaryTodo as Todo } from '../../../types'
import { makeStyles, Typography } from '@material-ui/core';
import TodoCard from './TodoCard'
import { Alarm } from '@material-ui/icons'

const useStyles = makeStyles({
  deadline: {
    display: 'flex',
    alignItems: 'center'
  }
})
interface Props {
  todo: Todo,
  onDoneClick: (id: number) => void,
  onCardClick: (todo: Todo) => void
}
const TemporaryTodo: React.FC<Props> = ({ todo, onDoneClick, onCardClick }) => {
  const classes = useStyles()
  const generateAdvice = (todo: Todo) => {
    if (todo.minutesLeftToDeadline >= 0) {
      return `期限まであと${todo.distanceToDeadline}`
    } else {
      return `期限を${todo.distanceToDeadline}過ぎています`
    }
  }
  return (
    <TodoCard onCardClick={() => {onCardClick(todo)}} onDoneClick={(e: React.MouseEvent) => {e.stopPropagation();onDoneClick(todo.id)}}>
      <Typography variant='h5'>
        {todo.name}
      </Typography>
      <Typography className={classes.deadline} color='textSecondary'>
        <Alarm />{format(todo.deadline, 'yyyy/M/d(E) HH:mm', { locale: ja })} 
      </Typography>
      <Typography variant='body1' color={todo.minutesLeftToDeadline < 0 ? 'secondary' : 'inherit'}>
        {generateAdvice(todo)}
      </Typography>
    </TodoCard>
  )
}
export default TemporaryTodo