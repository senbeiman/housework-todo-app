import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, differenceInMinutes, parseJSON, formatDistanceToNowStrict } from 'date-fns';
import { ja } from 'date-fns/locale';

interface TodoBackend {
  name: string,
  deadline: string
}
interface Todo {
  name: string,
  deadline: Date,
  minutesLeftToDeadline: number,
  distanceToDeadline: string
}

const TemporaryTodo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const generateAdvice = (todo: Todo) => {
    if (todo.minutesLeftToDeadline >= 0) {
      return `期限まであと${todo.distanceToDeadline}`
    } else {
      return `期限を${todo.distanceToDeadline}過ぎています`
    }
  }
  return (
    <div key={todo.name}>
      <div>
        {todo.name}
      </div>
      <div>
        期限：{format(todo.deadline, 'yyyy/MM/dd(E) HH:mm', { locale: ja })} 
      </div>
      <div>
        {generateAdvice(todo)}
      </div>
    </div>
  )
}
const TemporaryTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const calculateParametersToUpdate = (deadline: Date) => {
    const distanceToDeadline = formatDistanceToNowStrict(deadline, { locale: ja })
    const minutesLeftToDeadline = differenceInMinutes(deadline, new Date())
    return {
      distanceToDeadline,
      minutesLeftToDeadline
    }
  }
  
  useEffect(() => {
    const getTemporaryTodos = async () => {
      const { data } = await axios.get('http://localhost:3001/temporary_todos')
      const todosToUpdate = data.map((todo: TodoBackend) => {
        const deadline = parseJSON(todo.deadline)
        const { distanceToDeadline, minutesLeftToDeadline } = calculateParametersToUpdate(deadline)
        return {
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
    <div>
      <div>Temporary</div>
      {sortedTodos.map(todo => (
        <TemporaryTodo key={todo.name} todo={todo} />
      ))}
    </div>
  )
}

export default TemporaryTodos;