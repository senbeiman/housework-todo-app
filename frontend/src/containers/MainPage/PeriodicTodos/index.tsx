import React, { useState, useEffect } from 'react';
import todoService from '../../../services/todo'
import { startOfDay, differenceInDays, startOfToday, parseJSON } from 'date-fns';
import { PeriodicTodo as Todo, PeriodicTodoBackend as TodoBackend, FormValues } from '../../../types';
import PeriodicTodo from './PeriodicTodo'
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons'
import CreateTodo from '../components/TodoFormModal';

const useStyles = makeStyles({
  container: {
    flex: 1,
  },
  todos: {
    overflow: 'auto',
    maxHeight: '70vh'
  }
})

const PeriodicTodos: React.FC = () => {
  const classes = useStyles()
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  

  const calculateParametersToUpdate = ({ lastUpdatedAt , desiredIntervalDays }: {lastUpdatedAt: Date | null, desiredIntervalDays: number}) => {
    const calculateDistanceFromToday = (lastUpdatedAt: Date) => (
      differenceInDays(startOfToday(), startOfDay(lastUpdatedAt))
    )
    const lastUpdatedDistance = lastUpdatedAt && calculateDistanceFromToday(lastUpdatedAt)
    const daysLeftToDesired = (lastUpdatedDistance !== null) ? (desiredIntervalDays - lastUpdatedDistance) : null
    return {
      lastUpdatedDistance,
      daysLeftToDesired
    }
  }
  const calculateParametersToShow = (todo: TodoBackend) => {
    const lastUpdatedAt = todo.last_updated_at ? parseJSON(todo.last_updated_at) : null
    const desiredIntervalDays = todo.desired_interval_days
    const { lastUpdatedDistance, daysLeftToDesired } = calculateParametersToUpdate({ lastUpdatedAt, desiredIntervalDays })
    return {
      lastUpdatedAt,
      lastUpdatedDistance,
      desiredIntervalDays,
      daysLeftToDesired
    }
  }
  const onDoneClick = async (todo: Todo) => {
    const todoToSend = {
      name: todo.name,
      desired_interval_days: todo.desiredIntervalDays,
      last_updated_at: new Date()
    }
    const todoSent = (await todoService.edit(`/periodic_todos/${todo.id}`, todoToSend)) as TodoBackend
    const todoToUpdate = {
      id: todoSent.id,
      name: todoSent.name,
      ...calculateParametersToShow(todoSent)
    }
    const todosToUpdate = todos.map(t =>
      t.id === todo.id ? todoToUpdate : t
    )
    setTodos(todosToUpdate)
  }
  const parseTodo = (todo: TodoBackend) => {
    return {
      id: todo.id,
      name: todo.name,
      ...calculateParametersToShow(todo)
    }
  }
  useEffect(() => {
    const getPeriodicalTodos = async () => {
      const data = await todoService.get('/periodic_todos')
      // TODO: parse data from API
      const todosToUpdate = (data as TodoBackend[]).map(parseTodo)
      setTodos(todosToUpdate)
    }
    getPeriodicalTodos()
  }, [])

  useEffect(() => {
    const todosToUpdate = todos.map((todo: Todo) => {
      const { lastUpdatedDistance, daysLeftToDesired } = calculateParametersToUpdate({
        lastUpdatedAt: todo.lastUpdatedAt,
        desiredIntervalDays: todo.desiredIntervalDays
      })
      return {
        ...todo,
        lastUpdatedDistance,
        daysLeftToDesired
      }
    })
    // TODO: refactor not to use polling but to trigger from clock component's push that notifies a day changing
    const intervalId = setInterval(() => {
      setTodos(todosToUpdate)
    }, 1000 * 60)
    return () => {clearInterval(intervalId)}
  }, [todos])

  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.daysLeftToDesired) {
      return -1
    }
    if (!b.daysLeftToDesired) {
      return 1
    }
    return a.daysLeftToDesired - b.daysLeftToDesired
  })

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedTodo(null)
  }
  const handleCardClick = (todo: Todo) => {
    setSelectedTodo(todo)
    setModalOpen(true)
  }

  const handleModalSubmit = async (values: FormValues) => {
    const updatedValues = {
      name: values.name,
      desired_interval_days: values.desiredIntervalDays,
    }
    if (selectedTodo) {
      const data = await todoService.edit(`/periodic_todos/${selectedTodo.id}`, updatedValues)
      setTodos(todos.map(todo => todo.id === selectedTodo.id ? parseTodo(data as TodoBackend) : todo))
    } else {
      const data = await todoService.create('/periodic_todos', {
        ...updatedValues,
        last_updated_at: null
      })
      setTodos([...todos, parseTodo(data as TodoBackend)])
    }
    handleModalClose()
  }
  const handleModalDelete = async (id: number) => {
    await todoService.remove(`/periodic_todos/${id}`)
    const todosToUpdate = todos.filter(todo => todo.id !== id)
    setTodos(todosToUpdate)
    handleModalClose()
  }
  return (
    <div className={classes.container}>
      <Typography variant='h5'>繰り返しタスク</Typography>
      <div className={classes.todos}>
        {sortedTodos.map(todo => (
          <PeriodicTodo key={todo.id} todo={todo} onDoneClick={onDoneClick} onCardClick={handleCardClick}/>
        ))}
      </div>
      <IconButton onClick={()=>{setModalOpen(true)}}>
        <AddCircleOutline fontSize='large'/>
      </IconButton>
      <CreateTodo open={modalOpen} handleClose={handleModalClose} selectedTodo={selectedTodo} todoType='periodic'  handleSubmit={handleModalSubmit} handleDelete={handleModalDelete}/>
    </div>
  )
}

export default PeriodicTodos;

