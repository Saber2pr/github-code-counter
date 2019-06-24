import React, { useRef } from 'react'
import { store } from '../../store'
import './style.less'
import { usePush } from '@saber2pr/router'
import { Action } from '../../actions'

export const Login = () => {
  const user_ref = useRef<HTMLInputElement>()
  const password_ref = useRef<HTMLInputElement>()

  const [push] = usePush()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userId = user_ref.current.value
    const password = password_ref.current.value

    if (userId && password) {
      store.dispatch(Action.login(userId, password)).then(() => push('/main'))
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
              Github id: <input ref={user_ref} type="text" />
            </li>
            <li>
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
