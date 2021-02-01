import React, { useState, useEffect } from 'react';
import { differenceInMinutes, parseJSON, formatDistanceToNowStrict } from 'date-fns';
import { ja } from 'date-fns/locale';
import todoService from '../../../services/todo'
import { TemporaryTodo as Todo, TemporaryTodoBackend as TodoBackend } from '../../../types'
import TemporaryTodo from './TemporaryTodo'
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    flex: 1,
    marginLeft: 5,
  }
})
//TODO: pick same logic between PeriodicTodos and TemporaryTodos and create wrapping component
const TemporaryTodos: React.FC = () => {
  const classes = useStyles()
  const [todos, setTodos] = useState<Todo[]>([]);

  const calculateParametersToUpdate = (deadline: Date) => {
    const distanceToDeadline = formatDistanceToNowStrict(deadline, { roundingMethod: 'floor', locale: ja })
    const minutesLeftToDeadline = differenceInMinutes(deadline, new Date())
    return {
      distanceToDeadline,
      minutesLeftToDeadline
    }
  }
  
  const onDoneClick = async (id: number) => {
    await todoService.remove(`/temporary_todos/${id}`)
    const todosToUpdate = todos.filter(todo => todo.id !== id)
    setTodos(todosToUpdate)
  }
  useEffect(() => {
    const getTemporaryTodos = async () => {
      const data = await todoService.get('/temporary_todos')
      // TODO: parse data from API
      const todosToUpdate = (data as TodoBackend[]).map((todo) => {
        const deadline = parseJSON(todo.deadline)
        const { distanceToDeadline, minutesLeftToDeadline } = calculateParametersToUpdate(deadline)
        return {
          id: todo.id,
          name: todo.name,
          deadline,
          distanceToDeadline,
          minutesLeftToDeadline
        }
      })
      setTodos(todosToUpdate)
    }
    getTemporaryTodos()
  }, [])

  useEffect(() => {
    const todosToUpdate = todos.map((todo: Todo) => {
      const { distanceToDeadline, minutesLeftToDeadline } = calculateParametersToUpdate(todo.deadline)
      return {
        ...todo,
        distanceToDeadline,
        minutesLeftToDeadline
      }
    })
    const intervalId = setInterval(() => {
      setTodos(todosToUpdate)
    }, 1000 * 60)
    return () => {clearInterval(intervalId)}
  }, [todos])

  const sortedTodos = [...todos].sort((a, b) => 
    a.minutesLeftToDeadline - b.minutesLeftToDeadline
  )

  return (
    <div className={classes.container}>
      <Typography variant='h5'>一回タスク</Typography>
      {sortedTodos.map(todo => (
        <TemporaryTodo key={todo.id} todo={todo} onDoneClick={onDoneClick}/>
      ))}
      <IconButton component={Link} to='/create_temporary'>
        <AddCircleOutline fontSize='large'/>
      </IconButton>
    </div>
  )
}

export default TemporaryTodos;