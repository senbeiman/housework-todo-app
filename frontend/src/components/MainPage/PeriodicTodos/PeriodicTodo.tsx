import React  from 'react';
import { PeriodicTodo as Todo } from '../../../types';
import { makeStyles, Card, CardContent, CardActions, IconButton, Typography } from '@material-ui/core';
import { Delete, Done } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    backgroundColor: 'yellow',
  },
  cardContent: {
    paddingBottom: 0
  },
  cardActions: {
    paddingTop: 0
  },
  dayContainer: {
    display: 'flex',
    justifyContent: 'space-between'
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
  // TODO: extract same card structure between periodic and temporary
  return (
    <Card className={classes.root}> 
      <CardContent className={classes.cardContent}>
        <Typography variant='h5'>
          {todo.name} 
        </Typography>
        <div className={classes.dayContainer}>
          <Typography color='textSecondary'>
            {todo.desiredIntervalDays}日毎 
          </Typography>
          <Typography color='textSecondary'>
            { (todo.lastUpdatedDistance !== null) ?
              `最終実施：${todo.lastUpdatedDistance === 0 ? '今日' : `${todo.lastUpdatedDistance}日前`}`
              : '未実施'
            }
          </Typography>
        </div>
        <Typography variant='body1'>
          {generateAdvice(todo.daysLeftToDesired)}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton onClick={() => {onDeleteClick(todo.id)}}>
          <Delete />
        </IconButton>
        <IconButton onClick={() => {onDoneClick(todo)}}>
          <Done />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PeriodicTodo