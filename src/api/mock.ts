import { RepoLang } from './types'

export const data: RepoLang[] = [
  {
    name: 'test1',
    langs: {
      Typescript: 1000,
      'C++': 122
    }
  },
  {
    name: 'test2',
    langs: {
      Typescript: 1000,
      'C++': 122
    }
  },
  {
    name: 'test3',
    langs: {
      Typescript: 1000,
      'C++': 122
    }
  },
  {
    name: 'test4',
    langs: {
      Typescript: 1000,
      'C++': 122
    }
  },
  {
    name: 'test5',
    langs: {
      Typescript: 1000,
      'C++': 122
    }
  },
  {
    name: 'test6',
    langs: {
      Typescript: 1000,
      'C++': 122
    }
  },
  {
    name: 'test7',
    langs: {
      Typescript: 1000,
      js: 122,
      haskell: 0,
      makeFile: 0,
      c: 0
    }
  }
]

export const getMockData = async (
  userId: string,
  onProgress?: (res: RepoLang[]) => void
) => {
  onProgress && onProgress(data)

  return data
}
