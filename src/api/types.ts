export type Contents = Array<{
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  _links: { self: string; git: string; html: string }
}>

export interface Languages {
  [language: string]: number
}

export interface ReposLanguages {
  [language: string]: {
    count: number
    repos: number
  }
}

export interface RepoLang {
  name: string
  langs: Languages
}
