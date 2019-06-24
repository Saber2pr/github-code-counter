import axios from 'axios'
import { store } from '../store'

axios.interceptors.request.use(config => {
  const { userId, password } = store.getState()
  config.headers.Authorization = `Basic ${btoa(`${userId}:${password}`)}`

  return config
})

axios.interceptors.response.use(res => {
  if (res.status !== 200) return Promise.reject()

  return res
})

export { axios }
