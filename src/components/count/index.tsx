import React from 'react'
import { useUserInfor } from '../../hook'
import './style.less'

export interface Count {
  max:number
  count: number
  isDone: boolean
  render?: () => JSX.Element
}

export const Count = ({ max, count, isDone, render }: Count) => {
  const rendered = render && render()

  if (isDone) {
    return <span className="Count">{count}个仓库已分析完毕！</span>
  }

  return (
    <span className="Count">
      {rendered}已找到 {count}/{max} 个仓库...
    </span>
  )
}
