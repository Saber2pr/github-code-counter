import React, { useState } from 'react'
import { Table, Delay, Count, Loading } from './components'
import { useUserAllRepo } from './hook'
import './app.less'
import { store } from './store'

export const App = () => {
  const { userInfor, userId } = store.getState()

  const { public_repos } = userInfor

  const [isDone, setStatu] = useState(false)
  const [langs, count] = useUserAllRepo(userId, () => setStatu(true))

  return (
    <>
      <header className="banner">
        <h1>
          <i className="ani-color">Github Code Counter</i>
        </h1>
      </header>
      <main className="App">
        <section>
          <ul>
            <li>
              <Delay time={1000}>
                <i className="App_write">你在Github己经写下了：</i>
              </Delay>
            </li>
            <li>
              <Delay time={2000}>
                <Count
                  max={public_repos}
                  count={count}
                  render={() => <Loading />}
                  isDone={isDone}
                />
              </Delay>
            </li>
          </ul>
        </section>

        <section className="table">
          <Table langs={langs}></Table>
        </section>
      </main>
      <footer className="footer">
        <p className="auth">{isDone && 'by saber2pr'}</p>
      </footer>
    </>
  )
}
