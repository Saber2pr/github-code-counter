import React, { useState } from 'react'
import { Table, Delay, Count, Loading } from './components'
import { useUserAllRepo } from './hook'
import './app.less'

export const App = () => {
  const id = 'saber2pr'
  const [langs, count] = useUserAllRepo(id)
  const [isDone, setStatu] = useState(false)

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
                  id={id}
                  count={count}
                  onDone={setStatu}
                  render={() => <Loading />}
                />
              </Delay>
            </li>
          </ul>
        </section>

        <section className="table">
          <Table langs={langs}></Table>
        </section>
      </main>
      <footer className="footer">{isDone && 'by saber2pr'}</footer>
    </>
  )
}
