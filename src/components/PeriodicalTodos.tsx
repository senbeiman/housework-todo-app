import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { differenceInDays, parseJSON } from 'date-fns';

interface TodoBackend {
  name: string,
  last_updated_at: string,
  desired_interval_days: number
}
interface Todo {
  name: string,
  lastUpdatedAt: Date,
  desiredIntervalDays: number
}

const PeriodicalTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
 
  useEffect(() => {
    const getPeriodicalTodos = async () => {
      const { data } = await axios.get('http://localhost:3001/periodical_todos')
      console.log(data)
      setTodos(data.map((todo: TodoBackend)=> ({
        name: todo.name,
        lastUpdatedAt: parseJSON(todo.last_updated_at),
        desiredIntervalDays: todo.desired_interval_days
      })))
    }
    getPeriodicalTodos()
  }, [])
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.name}>
          <div>
            {todo.name}
          </div>
          <div>
            Updated: {differenceInDays(new Date(), todo.lastUpdatedAt)} days ago
          </div>
          <div>
            Desired interval: {todo.desiredIntervalDays} days
          </div>
        </div>
      ))}
    </div>
  )
}

export default PeriodicalTodos;

