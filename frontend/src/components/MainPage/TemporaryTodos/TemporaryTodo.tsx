import React  from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { TemporaryTodo as Todo } from '../../../types'
import { makeStyles, Card, CardContent, CardActions, IconButton, Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'yellow',
    marginTop: 10,
  },
  cardContent: {
    paddingBottom: 0
  },
  cardActions: {
    paddingTop: 0
  },
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
    <Card className={classes.root} onClick={() => {onCardClick(todo)}}>
      <CardContent className={classes.cardContent}>
        <Typography variant='h5'>
          {todo.name}
        </Typography>
        <Typography color='textSecondary'>
          期限：{format(todo.deadline, 'yyyy/MM/dd(E) HH:mm', { locale: ja })} 
        </Typography>
        <Typography variant='body1'>
          {generateAdvice(todo)}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton>
          <Done onClick={(e) => {e.stopPropagation();onDoneClick(todo.id)}}/>
        </IconButton>
      </CardActions>
    </Card>
  )
}
export default TemporaryTodo