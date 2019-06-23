import { getAllRepoLangs, ReposLanguages } from '../api'
import { useState, useEffect } from 'react'
import { merge } from '../utils'

export const useUserAllRepo = (id: string): [ReposLanguages, number] => {
  const [langs, update] = useState<ReposLanguages>()
  const [count, setCount] = useState(0)

  useEffect(() => {
    getAllRepoLangs(id, res => {
      update(merge(res))
      setCount(res.length)
    })
  }, [id])

  return [langs, count]
}
