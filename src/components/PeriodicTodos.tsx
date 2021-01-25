import React, { useState, useEffect } from 'react';
import todoService from '../services/todo'
import { startOfDay, differenceInDays, startOfToday, parseJSON } from 'date-fns';
import { PeriodicTodo as Todo, PeriodicTodoBackend as TodoBackend } from '../types';


const PeriodicTodo: React.FC<{ todo: Todo }> = ({ todo }) => {
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
    <div key={todo.name}>
      <div>
        {todo.name} {todo.desiredIntervalDays}日毎 
      </div>
      { todo.lastUpdatedDistance ?
        <div>
          最終実施：{todo.lastUpdatedDistance}日前 
        </div>
        : <div>
          未実施
        </div>
      }
      <div>
        {generateAdvice(todo.daysLeftToDesired)}
      </div>
    </div>
  )
}
const PeriodicTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const calculateDistanceFromToday = (lastUpdatedAt: Date) => (
    differenceInDays(startOfToday(), startOfDay(lastUpdatedAt))
  )
 
  useEffect(() => {
    const getPeriodicalTodos = async () => {
      const data = await todoService.get('/periodic_todos')
      // todo: parse data from API
      const todosToUpdate = (data as TodoBackend[]).map((todo) => {
        const lastUpdatedAt = todo.last_updated_at ? parseJSON(todo.last_updated_at) : null
        const lastUpdatedDistance = lastUpdatedAt && calculateDistanceFromToday(lastUpdatedAt)
        const desiredIntervalDays = todo.desired_interval_days
        return {
          id: todo.id,
          name: todo.name,
          lastUpdatedAt,
          desiredIntervalDays,
          lastUpdatedDistance,
          daysLeftToDesired: lastUpdatedDistance && (desiredIntervalDays - lastUpdatedDistance)
        }
      })
      console.log(todosToUpdate)
      setTodos(todosToUpdate)
    }
    getPeriodicalTodos()
  }, [])

  useEffect(() => {
    const todosToUpdate = todos.map((todo: Todo) => {
      const lastUpdatedDistance = todo.lastUpdatedAt && calculateDistanceFromToday(todo.lastUpdatedAt)
      return {
        ...todo,
        lastUpdatedDistance,
        daysLeftToDesired: lastUpdatedDistance && (todo.desiredIntervalDays - lastUpdatedDistance)
      }
    })
    const intervalId = setInterval(() => {
      setTodos(todosToUpdate)
    }, 1000 * 60)
    return () => {clearInterval(intervalId)}
  }, [todos])

  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.daysLeftToDesired) {
      return 1
    }
    if (!b.daysLeftToDesired) {
      return -1
    }
    return a.daysLeftToDesired - b.daysLeftToDesired
  })

  return (
    <div>
      <div>Periodic</div>
      {sortedTodos.map(todo => (
        <PeriodicTodo key={todo.name} todo={todo} />
      ))}
    </div>
  )
}

export default PeriodicTodos;

