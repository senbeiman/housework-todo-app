import React  from 'react';
import { makeStyles, Card, IconButton } from '@material-ui/core';
import { Done } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'yellow',
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardContent: {
    margin: 10,
    width: '100%'
  },
  icon: {
    color: theme.palette.success.main,
    borderLeft: 'solid',
    borderColor: theme.palette.divider,
    borderWidth: 2,
    cursor: 'none',
    borderRadius: 0
  },
}))
interface Props {
  onDoneClick: (e: React.MouseEvent) => void,
  onCardClick: () => void
}

const TodoCard: React.FC<Props> = ({ onDoneClick, onCardClick, children }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} onClick={onCardClick}>
      <div className={classes.cardContent}>
        {children}
      </div>
      <IconButton className={classes.icon} onClick={onDoneClick}>
        <Done />
      </IconButton>
    </Card>
  )
}

export default TodoCard
