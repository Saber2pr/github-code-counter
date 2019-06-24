import { useState, useEffect } from 'react'
import { getAllRepoLangs, ReposLanguages, RepoLang } from '../api'
import { merge } from '../utils'

export const useUserAllRepo = (
  id: string,
  onDone?: (langs: RepoLang[]) => void
): [ReposLanguages, number] => {
  const [langs, update] = useState<ReposLanguages>()
  const [count, setCount] = useState(0)

  useEffect(() => {
    getAllRepoLangs(id, res => {
      update(merge(res))
      setCount(res.length)
    }).then(langs => onDone && onDone(langs))
  }, [id])

  return [langs, count]
}
