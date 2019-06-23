import React from 'react'
import { ReposLanguages } from '../../api'
import './style.less'

export interface Table {
  langs: ReposLanguages
}

const convertMapToTuple = (langs: ReposLanguages) =>
  Object.entries(langs).sort(([_, a], [__, b]) => b.count - a.count)

export const Table = ({ langs }: Table) => {
  if (!langs) return null

  const data = convertMapToTuple(langs)
  return (
    <table className="Table">
      <thead>
        <tr>
          <th>语言类型</th>
          <th>代码行数</th>
          <th>仓库数量</th>
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
    </table>
  )
}
