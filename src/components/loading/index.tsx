import React from 'react'
import './style.less'

export interface Loading {}

export const Loading = ({  }: Loading) => {
  return <span className="Loading ani-rotate"></span>
}
