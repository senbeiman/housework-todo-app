import axios from 'axios';
import { TemporaryTodoForm, PeriodicTodoSend } from '../types'

const baseUrl = 'http://localhost:3001' 

const get = async (path: string): Promise<unknown> => {
  const { data } = await axios.get(baseUrl + path)
  return data
}

const create = async (path: string, todo: TemporaryTodoForm | PeriodicTodoSend): Promise<unknown> => {
  const { data } = await axios.post(baseUrl + path, todo)
  return data
}

const remove = async (path: string): Promise<unknown> => {
  const { data } = await axios.delete(baseUrl + path)
  return data
}

const edit = async (path: string, todo: TemporaryTodoForm | PeriodicTodoSend): Promise<unknown> => {
  const { data } = await axios.put(baseUrl + path, todo)
  return data
}

export default {
  get,
  create,
  remove,
  edit
}