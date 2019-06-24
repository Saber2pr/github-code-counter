import React from 'react'
import { ReposLanguages } from '../../api'
import { range, zips } from '@saber2pr/fp'
import { Delay } from '../delay'
import { sumLang, byteToLines } from '../../utils'
import './style.less'

export interface Result {
  langs: ReposLanguages
}

export const Result = ({ langs }: Result) => {
  const ts = [...range(5)]

  const { first } = sumLang(langs)
  const ds = [
    '你的信仰语言',
    first[0],
    `在${first[1].repos}个仓库中使用`,
    `总计 ${first[1].count}bytes (${byteToLines(first[1].count)}lines)`,
    'by saber2pr'
  ]

  const series = zips(ts, ds) as [
    [number, string],
    [number, string],
    [number, number],
    [number, number],
    [number, string]
  ]

  return (
    <div className="Result">
      {series.map(([time, val]) => (
        <Delay key={time} time={time * 1000}>
          <p>
            <i className="line">{val}</i>
          </p>
        </Delay>
      ))}
    </div>
  )
}
