import { ReposLanguages } from '../api'

export const convertMapToTuple = (langs: ReposLanguages) =>
  Object.entries(langs).sort(([_, a], [__, b]) => b.count - a.count)

type LangsTuple = [
  string,
  {
    count: number
    repos: number
  }
][]

type SumResult = {
  first: LangsTuple[0]
} & LangsTuple[0][1]

export const sum = (langsTuple: LangsTuple): SumResult => {
  const count = langsTuple.reduce((s, [_, { count }]) => s + count, 0)
  const repos = langsTuple.reduce((s, [_, { repos }]) => s + repos, 0)
  return {
    first: langsTuple[0],
    count,
    repos
  }
}

export const sumLang = (lang: ReposLanguages) => sum(convertMapToTuple(lang))
