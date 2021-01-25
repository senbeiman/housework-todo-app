import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { startOfDay, differenceInDays, startOfToday, parseJSON } from 'date-fns';

interface TodoBackend {
  name: string,
  last_updated_at: string,
  desired_interval_days: number
}
interface Todo {
  name: string,
  lastUpdatedAt: Date,
  lastUpdatedDistance: number,
  desiredIntervalDays: number,
  daysLeftToDesired: number
}

const PeriodicTodo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const generateAdvice = (daysLeftToDesired: number) => {
    if (daysLeftToDesired >= 1) {
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
      <div>
        最終実施：{todo.lastUpdatedDistance}日前 
      </div>
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
      const { data } = await axios.get('http://localhost:3001/periodical_todos')
      const todosToUpdate = data.map((todo: TodoBackend) => {
        const lastUpdatedAt = parseJSON(todo.last_updated_at)
        const lastUpdatedDistance = calculateDistanceFromToday(lastUpdatedAt)
        const desiredIntervalDays = todo.desired_interval_days
        return {
          name: todo.name,
          lastUpdatedAt,
          desiredIntervalDays,
          lastUpdatedDistance,
          daysLeftToDesired: desiredIntervalDays - lastUpdatedDistance
        }
      })
      setTodos(todosToUpdate)
    }
    getPeriodicalTodos()
  }, [])

  useEffect(() => {
    const todosToUpdate = todos.map((todo: Todo) => {
      const lastUpdatedDistance = calculateDistanceFromToday(todo.lastUpdatedAt)
      return {
        ...todo,
        lastUpdatedDistance,
        daysLeftToDesired: todo.desiredIntervalDays - lastUpdatedDistance
      }
    })
    const intervalId = setInterval(() => {
      setTodos(todosToUpdate)
    }, 1000 * 60)
    return () => {clearInterval(intervalId)}
  }, [todos])

  const sortedTodos = [...todos].sort((a, b) => 
    a.daysLeftToDesired - b.daysLeftToDesired
  )

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

