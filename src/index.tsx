import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from '@saber2pr/router'

import { App } from './app'
import { Login, Error } from './components'
import { Local } from './local'
import { store } from './store'
import { Action } from './actions'

import './index.less'
import 'normalize.css'
import 'animate.css'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route default path="/login" component={() => <Login />}></Route>
    <Route path="/main" component={() => <App />}></Route>
    <Route path="/error" component={() => <Error />}></Route>
  </Router>,
  document.getElementById('root')
)

const auth = Local.getUserAuth()
if (auth) {
  store.dispatch(Action.login(auth.username, auth.password))
} else {
  hashHistory.push('./login')
}
