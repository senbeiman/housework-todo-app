import React  from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { TemporaryTodo as Todo } from '../../../types'
import { makeStyles, Card, CardContent, CardActions } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'yellow',
    margin: 10,
  }
})
interface Props {
  todo: Todo,
  onDoneClick: (id: number) => void
}
const TemporaryTodo: React.FC<Props> = ({ todo, onDoneClick }) => {
  const classes = useStyles()
  const generateAdvice = (todo: Todo) => {
    if (todo.minutesLeftToDeadline >= 0) {
      return `期限まであと${todo.distanceToDeadline}`
    } else {
      return `期限を${todo.distanceToDeadline}過ぎています`
    }
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <div>
          {todo.name}
        </div>
        <div>
          期限：{format(todo.deadline, 'yyyy/MM/dd(E) HH:mm', { locale: ja })} 
        </div>
        <div>
          {generateAdvice(todo)}
        </div>
      </CardContent>
      <CardActions>
        <button onClick={() => {onDoneClick(todo.id)}}>done</button>
      </CardActions>
    </Card>
  )
}
export default TemporaryTodo