import React, { Props, useState, ReactNode } from 'react'
import './style.less'

export interface Delay extends Props<any> {
  time: number
}

export const Delay = ({ time, children }: Delay) => {
  const [comp, alt] = useState<ReactNode>(<></>)

  setTimeout(() => alt(children), time)

  return <div className="Delay">{comp}</div>
}
