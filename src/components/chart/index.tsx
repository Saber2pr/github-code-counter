import React from 'react'
import { ReposLanguages } from '../../api'
import './style.less'

export interface Chart {
  langs: ReposLanguages
}

export const Chart = ({ langs }: Chart) => {
  return <div className="Chart">Chart</div>
}
