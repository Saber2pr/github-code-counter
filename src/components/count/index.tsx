import React from 'react'
import { useUserInfor } from '../../hook'
import './style.less'

export interface Count {
  id: string
  count: number
  onDone?: (isFinished: boolean) => void
  render?: () => JSX.Element
}

export const Count = ({ id, count, onDone, render }: Count) => {
  const userInfor = useUserInfor(id)
  if (!userInfor) return null
  const { public_repos } = userInfor

  const rendered = render && render()

  if (count === public_repos) {
    onDone && onDone(true)
    return <span className="Count">{public_repos}个仓库已分析完毕！</span>
  }

  return (
    <span className="Count">
      {rendered}已找到 {count}/{public_repos} 个仓库...
    </span>
  )
}
