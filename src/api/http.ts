import { Request } from '@saber2pr/request'
import { store } from '../store'
import H from '@saber2pr/router'
import { model } from '../components'
import { CSSProperties } from 'react'

const axios = new Request({
  timeout: 20000
})

axios.interceptors.request.use(config => {
  const { userId, password } = store.getState()

  if (userId && password) {
    config.headers.Authorization = `Basic ${btoa(`${userId}:${password}`)}`
  }

  return config
})

axios.interceptors.response.use(res => {
  if (res.status === 401) {
    model.newInstance(
      {
        style: {
          color: '#aeaeae',
          textAlign: 'center'
        } as CSSProperties
      },
      notification => {
        notification.notice({
          content: '用户名或密码错误'
        })
      }
    )
    H.pushHash('/login')
    return null
  }
  if (res.status === 403) {
    return Promise.reject() as any
  }

  if (res.status !== 200) {
    store.dispatch('error', {
      status: res.status,
      statusText: res.statusText,
      message: JSON.stringify(res.data, null, 2)
    })
    H.pushHash('/error')
  }

  return res
})

export { axios }
