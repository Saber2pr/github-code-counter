import React from 'react'
import { ReposLanguages } from '../../api'
import { convertMapToTuple, sum, byteToLines } from '../../utils'
import './style.less'

export interface Table {
  langs: ReposLanguages
}

export const Table = ({ langs }: Table) => {
  if (!langs) return null

  const data = convertMapToTuple(langs)
  const { count } = sum(data)

  return (
    <table className="Table">
      <thead>
        <tr>
          <th>语言类型</th>
          <th>使用次数</th>
          <th>字节(bytes)</th>
        </tr>
      </thead>
      <tbody>
        {data.map(([lang, { count, repos }]) => (
          <tr key={lang}>
            <th>{lang}</th>
            <td>{repos}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>共计</th>
          <td></td>
          <td>
            <div>{`${count}`}</div>
            <div>
              <i className="line">约{byteToLines(count)}行</i>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
