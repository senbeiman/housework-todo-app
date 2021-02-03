import axios from 'axios';

const get = async (path: string): Promise<unknown> => {
  const { data } = await axios.get(path)
  return data
}

export default {
  get,
}
