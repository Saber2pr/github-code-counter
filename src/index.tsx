import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import './index.less'
import 'normalize.css'
import 'animate.css'
import { Router, Route, hashHistory } from '@saber2pr/router'
import { Login, Error } from './components'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route default path="/login" component={() => <Login />}></Route>
    <Route path="/main" component={() => <App />}></Route>
    <Route path="/error" component={() => <Error />}></Route>
  </Router>,
  document.getElementById('root')
)
