import React from 'react'
import { store } from '../../store'
import './style.less'

export interface Error {}

export const Error = ({  }: Error) => {
  const error = store.getState().error
  return (
    <div className="Error">
      <h1>Exception</h1>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Describe</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(error).map(([k, v]) => (
            <tr key={k}>
              <th>{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
