import axios from 'axios';
import { TemporaryTodoSend, PeriodicTodoSend } from '../types'

const baseUrl = 'http://localhost:3002' 

const get = async (path: string): Promise<unknown> => {
  const { data } = await axios.get(baseUrl + path)
  return data
}

const create = async (path: string, todo: TemporaryTodoSend | PeriodicTodoSend): Promise<unknown> => {
  const { data } = await axios.post(baseUrl + path, todo)
  return data
}

const remove = async (path: string): Promise<unknown> => {
  const { data } = await axios.delete(baseUrl + path)
  return data
}

const edit = async (path: string, todo: PeriodicTodoSend): Promise<unknown> => {
  const { data } = await axios.put(baseUrl + path, todo)
  return data
}

export default {
  get,
  create,
  remove,
  edit
}