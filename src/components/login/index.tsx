import React, { useRef } from 'react'
import { store } from '../../store'
import './style.less'
import { Action } from '../../actions'
import { Icon } from '../../static/iconfont'
import { Local } from '../../local'

export const Login = () => {
  const user_ref = useRef<HTMLInputElement>()
  const password_ref = useRef<HTMLInputElement>()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userId = user_ref.current.value
    const password = password_ref.current.value

    if (userId && password) {
      Local.clearAuth()
      Local.saveUserAuth(userId, password)
      store.dispatch(Action.login(userId, password))
    }
  }

  return (
    <>
      <header className="banner">
        <h1>
          <i className="ani-color">Github Code Counter</i>
        </h1>
      </header>
      <main className="Login">
        <form onSubmit={onSubmit}>
          <ul>
            <li>
              <Icon.Zhanghao />
              Github id: <input ref={user_ref} type="text" />
            </li>
            <li>
              <Icon.Mima />
              Password: <input ref={password_ref} type="password" />
            </li>
            <li>
              <button>submit</button>
            </li>
          </ul>
        </form>
      </main>
    </>
  )
}
