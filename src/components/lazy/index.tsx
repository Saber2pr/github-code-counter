import React, { Props, useRef, useEffect, useState, ReactNode } from 'react'
import { throttle } from '../../utils'
import './style.less'

export interface Lazy extends Props<any> {}

export const Lazy = ({ children }: Lazy) => {
  const container_ref = useRef()
  const [comp, alt] = useState<ReactNode>(<></>)
  let lock = true

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + window.innerHeight === document.body.scrollHeight) {
        throttle(() => {
          if (lock) {
            alt(children)
            lock = false
          }
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  })

  return (
    <div className="Lazy" ref={container_ref}>
      {comp}
    </div>
  )
}
