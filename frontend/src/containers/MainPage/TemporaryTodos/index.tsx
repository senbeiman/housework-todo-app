import React, { useState, useEffect } from 'react';
import { differenceInMinutes, parseJSON, formatDistanceToNowStrict, sub } from 'date-fns';
import { ja } from 'date-fns/locale';
import todoService from '../../../services/todo'
import { TemporaryTodo as Todo, TemporaryTodoBackend as TodoBackend, FormValues } from '../../../types'
import TemporaryTodo from './TemporaryTodo'
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons'
import CreateTodo from '../components/TodoFormModal';

const useStyles = makeStyles({
  container: {
    flex: 1,
    marginLeft: 5,
  },
  todos: {
    overflow: 'scroll',
    maxHeight: '70vh'
  }
})
//TODO: pick same logic between PeriodicTodos and TemporaryTodos and create wrapping component
const TemporaryTodos: React.FC = () => {
  const classes = useStyles()
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const calculateParametersToUpdate = (deadline: Date) => {
    const distanceToDeadline = formatDistanceToNowStrict(deadline, { roundingMethod: 'floor', locale: ja })
    const minutesLeftToDeadline = differenceInMinutes(deadline, new Date())
    return {
      distanceToDeadline,
      minutesLeftToDeadline
    }
  }
  

  const parseTodo = (todo: TodoBackend) => {
    const deadline = parseJSON(todo.deadline)
    const { distanceToDeadline, minutesLeftToDeadline } = calculateParametersToUpdate(deadline)
    return {
      id: todo.id,
      name: todo.name,
      deadline,
      distanceToDeadline,
      minutesLeftToDeadline
    }
  }
  useEffect(() => {
    const getTemporaryTodos = async () => {
      const data = await todoService.get('/temporary_todos')
      // TODO: parse data from API
      const todosToUpdate = (data as TodoBackend[]).map(parseTodo)
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

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedTodo(null)
  }
  const handleCardClick = (todo: Todo) => {
    setSelectedTodo(todo)
    setModalOpen(true)
  }
  const onDoneClick = async (id: number) => {
    await todoService.remove(`/temporary_todos/${id}`)
    const todosToUpdate = todos.filter(todo => todo.id !== id)
    setTodos(todosToUpdate)
    handleModalClose()
  } 
  const handleModalSubmit = async (values: FormValues) => {
    const newValues = {
      name: values.name,
      deadline: sub(parseJSON(`${values.deadline}:00`), { hours: 9 })
    }
    if (selectedTodo) {
      const data = await todoService.edit(`/temporary_todos/${selectedTodo.id}`, newValues)
      setTodos(todos.map(todo => todo.id === selectedTodo.id ? parseTodo(data as TodoBackend) : todo))
    } else {
      const data = await todoService.create('/temporary_todos', newValues)
      setTodos([...todos, parseTodo(data as TodoBackend)])
    }
    handleModalClose()
  }
  return (
    <div className={classes.container}>
      <Typography variant='h5'>一回タスク</Typography>
      <div className={classes.todos}>
        {sortedTodos.map(todo => (
          <TemporaryTodo key={todo.id} todo={todo} onDoneClick={onDoneClick} onCardClick={handleCardClick}/>
        ))}
      </div>
      <IconButton onClick={()=>{setModalOpen(true)}}>
        <AddCircleOutline fontSize='large'/>
      </IconButton> 
      <CreateTodo open={modalOpen} handleClose={handleModalClose} selectedTodo={selectedTodo} todoType='temporary' handleSubmit={handleModalSubmit} handleDelete={onDoneClick}/>
    </div>
  )
}

export default TemporaryTodos;