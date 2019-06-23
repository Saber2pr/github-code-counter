import React from 'react'
import { ReposLanguages } from '../../api'
import './style.less'

export interface Table {
  langs: ReposLanguages
}

const convertMapToTuple = (langs: ReposLanguages) =>
  Object.entries(langs).sort(([_, a], [__, b]) => b.count - a.count)

type LangsTuple = [
  string,
  {
    count: number
    repos: number
  }
][]

const sum = (langsTuple: LangsTuple) => {
  const codeLines = langsTuple.reduce((s, [_, { count }]) => s + count, 0)
  const repos = langsTuple.reduce((s, [_, { repos }]) => s + repos, 0)
  return {
    codeLines,
    repos
  }
}

export const Table = ({ langs }: Table) => {
  if (!langs) return null

  const data = convertMapToTuple(langs)
  const { codeLines, repos } = sum(data)

  return (
    <table className="Table">
      <thead>
        <tr>
          <th>语言类型</th>
          <th>代码行数</th>
          <th>使用次数</th>
        </tr>
      </thead>
      <tbody>
        {data.map(([lang, { count, repos }]) => (
          <tr key={lang}>
            <th>{lang}</th>
            <td>{count}</td>
            <td>{repos}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>共计</th>
          <td>{codeLines}</td>
        </tr>
      </tfoot>
    </table>
  )
}
