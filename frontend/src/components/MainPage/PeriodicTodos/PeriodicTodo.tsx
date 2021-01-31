import React  from 'react';
import { PeriodicTodo as Todo } from '../../../types';
import { makeStyles, Card, CardContent, CardActions } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: 10,
    backgroundColor: 'yellow'
  }
})
interface Props {
  todo: Todo,
  onDeleteClick: (id: number) => void,
  onDoneClick: (todo: Todo) => void
}

const PeriodicTodo: React.FC<Props> = ({ todo, onDeleteClick, onDoneClick }) => {
  const classes = useStyles()
  const generateAdvice = (daysLeftToDesired: number | null) => {
    if (daysLeftToDesired === null) {
      return null
    } else if (daysLeftToDesired >= 1) {
      return `ベストタイミングまであと${daysLeftToDesired}日`
    } else if (daysLeftToDesired === 0) {
      return `今日やるのがベストです`
    } else {
      return `ベストタイミングを${-daysLeftToDesired}日過ぎています`
    }
  }
  return (
    <Card className={classes.root}> 
      <CardContent>
        <div>
          {todo.name} {todo.desiredIntervalDays}日毎 
        </div>
        { (todo.lastUpdatedDistance !== null) ?
          <div>
            最終実施：{todo.lastUpdatedDistance === 0 ? '今日' : `${todo.lastUpdatedDistance}日前`}
          </div>
          : <div>
            未実施
          </div>
        }
        <div>
          {generateAdvice(todo.daysLeftToDesired)}
        </div>
      </CardContent>
      <CardActions>
        <button onClick={() => {onDeleteClick(todo.id)}}>delete</button>
        <button onClick={() => {onDoneClick(todo)}}>done</button>
      </CardActions>
    </Card>
  )
}

export default PeriodicTodo