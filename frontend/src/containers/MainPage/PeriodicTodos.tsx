import React, { useState, useEffect } from 'react';
import todoService from '../../services/todo'
import { startOfDay, differenceInDays, parseJSON } from 'date-fns';
import { PeriodicTodo as Todo, PeriodicTodoBackend as TodoBackend, FormValues } from '../../types';
import TodoList from './components/TodoList';

const PeriodicTodos: React.FC<{today: Date}> = ({ today }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  

  const calculateParametersToUpdate = ({ lastUpdatedAt , desiredIntervalDays }: {lastUpdatedAt: Date | null, desiredIntervalDays: number}) => {
    const calculateDistanceFromToday = (lastUpdatedAt: Date) => (
      differenceInDays(today, startOfDay(lastUpdatedAt))
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
  const onDoneClick = async (id: number) => {
    const todoToUpdate = todos.find((todo => todo.id === id))
    if (!todoToUpdate) {
      return
    }
    const todoToSend = {
      name: todoToUpdate.name,
      desired_interval_days: todoToUpdate.desiredIntervalDays,
      last_updated_at: new Date()
    }
    const todoSent = (await todoService.edit(`/periodic_todos/${id}`, todoToSend)) as TodoBackend
    const todoUpdated = {
      id: todoSent.id,
      name: todoSent.name,
      ...calculateParametersToShow(todoSent)
    }
    const todosUpdated = todos.map(t =>
      t.id === id ? todoUpdated : t
    )
    setTodos(todosUpdated)
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
    setTodos(todosToUpdate)
  }, [today])

  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.daysLeftToDesired) {
      return -1
    }
    if (!b.daysLeftToDesired) {
      return 1
    }
    return a.daysLeftToDesired - b.daysLeftToDesired
  })

  const handleSubmit = async ({values, todoId} : {values: FormValues, todoId: number | null}) => {
    const todoToUpdate = todos.find((todo => todo.id === todoId))
    const updatedValues = {
      name: values.name,
      desired_interval_days: values.desiredIntervalDays,
      last_updated_at: todoToUpdate ? todoToUpdate.lastUpdatedAt : null
    }
    if (todoId) {
      const data = await todoService.edit(`/periodic_todos/${todoId}`, updatedValues)
      setTodos(todos.map(todo => todo.id === todoId ? parseTodo(data as TodoBackend) : todo))
    } else {
      const data = await todoService.create('/periodic_todos', updatedValues)
      setTodos([...todos, parseTodo(data as TodoBackend)])
    }
  }
  const handleDelete = async (id: number) => {
    await todoService.remove(`/periodic_todos/${id}`)
    const todosToUpdate = todos.filter(todo => todo.id !== id)
    setTodos(todosToUpdate)
  }
  
  return (
    <TodoList 
      title='繰り返しタスク' 
      todoType='periodic' 
      todos={sortedTodos} 
      onDoneClick={onDoneClick}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}  
    />
  )
}

export default PeriodicTodos;

