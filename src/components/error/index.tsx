import React from 'react'
import './style.less'
import { store } from '../../store'

export interface Error {}

export const Error = ({  }: Error) => {
  const error = store.getState().error
  return (
    <div className="Error">
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
