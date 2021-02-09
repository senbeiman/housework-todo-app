import React, { useState } from 'react';
import { FormValues, PeriodicTodo as PeriodicTodoType, TemporaryTodo as TemporaryTodoType} from '../../../types';
import PeriodicTodo from '../PeriodicTodos/PeriodicTodo'
import TemporaryTodo from '../TemporaryTodos/TemporaryTodo'
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons'
import CreateTodo from '../components/TodoFormModal';

const useStyles = makeStyles({
  container: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  todos: {
    overflow: 'auto',
    maxHeight: '70vh'
  }
})
interface Props {
  title: string,
  todoType: 'periodic' | 'temporary',
  todos: PeriodicTodoType[] | TemporaryTodoType[],
  onDoneClick: (id: number) => void,
  handleSubmit: ({values, todoId} : {values: FormValues, todoId: number | null}) => void,
  handleDelete: (id: number) => void
}
const TodoList: React.FC<Props> = ({title, todoType, todos, onDoneClick, handleSubmit, handleDelete}) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedTodo, setSelectedTodo] = useState<PeriodicTodoType | TemporaryTodoType | null>(null)
  
  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedTodo(null)
  }
  const handleCardClick = (todo: PeriodicTodoType | TemporaryTodoType) => {
    setSelectedTodo(todo)
    setModalOpen(true)
  }

  const handleModalSubmit = async (values: FormValues) => {
    if (selectedTodo) {
      handleSubmit({values, todoId: selectedTodo.id})
    } else {
      handleSubmit({values, todoId: null})
    }
    handleModalClose()
  }
  const handleModalDelete = async (id: number) => {
    handleDelete(id)
    handleModalClose()
  }
  return (
    <div className={classes.container}>
      <Typography variant='h5'>{title}</Typography>
      <div className={classes.todos}>
        {todoType === 'periodic' ? 
        // TODO: consider to write without using as
          (todos as PeriodicTodoType[]).map(todo => (
            <PeriodicTodo key={todo.id} todo={todo} onDoneClick={onDoneClick} onCardClick={handleCardClick}/>
          )) :
          (todos as TemporaryTodoType[]).map(todo =>  
            <TemporaryTodo key={todo.id} todo={todo} onDoneClick={onDoneClick} onCardClick={handleCardClick}/>
          )
        }
      </div>
      <IconButton onClick={()=>{setModalOpen(true)}}>
        <AddCircleOutline fontSize='large'/>
      </IconButton>
      <CreateTodo open={modalOpen} handleClose={handleModalClose} selectedTodo={selectedTodo} todoType={todoType}  handleSubmit={handleModalSubmit} handleDelete={handleModalDelete}/>
    </div>
  )
}

export default TodoList;


