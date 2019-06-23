import axios from 'axios'

axios.interceptors.request.use(config => {
  config.headers.Authorization = `Basic ${btoa('saber2pr:rwasqd34')}`

  return config
})

axios.interceptors.response.use(res => {
  if (res.status !== 200) return Promise.reject()

  return res
})

export { axios }
