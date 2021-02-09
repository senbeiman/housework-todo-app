import React, { useState, useEffect } from 'react';
import { differenceInMinutes, parseJSON, formatDistanceToNowStrict, sub } from 'date-fns';
import { ja } from 'date-fns/locale';
import todoService from '../../services/todo'
import { TemporaryTodo as Todo, TemporaryTodoBackend as TodoBackend, FormValues } from '../../types'
import TodoList from './components/TodoList';

const TemporaryTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  const onDoneClick = async (id: number) => {
    await todoService.remove(`/temporary_todos/${id}`)
    const todosToUpdate = todos.filter(todo => todo.id !== id)
    setTodos(todosToUpdate)
  } 
  const handleSubmit = async ({values, todoId}: {values: FormValues, todoId: number | null}) => {
    const newValues = {
      name: values.name,
      deadline: sub(parseJSON(`${values.deadline}:00`), { hours: 9 })
    }
    if (todoId) {
      const data = await todoService.edit(`/temporary_todos/${todoId}`, newValues)
      setTodos(todos.map(todo => todo.id === todoId ? parseTodo(data as TodoBackend) : todo))
    } else {
      const data = await todoService.create('/temporary_todos', newValues)
      setTodos([...todos, parseTodo(data as TodoBackend)])
    }
  }
  return (
    <TodoList 
      title='一回タスク' 
      todoType='temporary' 
      todos={sortedTodos} 
      onDoneClick={onDoneClick}
      handleDelete={onDoneClick}
      handleSubmit={handleSubmit}  
    />
  )
}

export default TemporaryTodos;