import React from 'react'
import { Table } from './components'
import { useUserAllRepo, useUserInfor } from './hook'
import './app.less'

const Count = ({ id, count }: { id: string; count: number }) => {
  const userInfor = useUserInfor(id)
  if (!userInfor) return null
  const { public_repos } = userInfor

  if (count === public_repos) return <>{public_repos}个仓库已分析完毕！</>

  return (
    <>
      已找到[{count}/{public_repos}]个仓库
    </>
  )
}

export const App = () => {
  const id = 'saber2pr'
  const [langs, count] = useUserAllRepo(id)

  return (
    <>
      <header className="banner">
        <h1>
          <i className="ani-color">Github Code Counter</i>
        </h1>
        <i>你在Github己经写下了：</i>
      </header>
      <main className="App">
        <section>
          <Count id={id} count={count} />
        </section>
        <section className="table">
          <Table langs={langs}></Table>
        </section>
        <section>共计 [1] 字</section>
      </main>
      <footer className="footer">by saber2pr</footer>
    </>
  )
}
