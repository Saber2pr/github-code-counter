/*
 * @Author: saber2pr
 * @Date: 2019-06-19 20:07:26
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-23 17:31:31
 */
import { RepoLang, ReposLanguages } from '../api'

export const merge = (repos: RepoLang[]) =>
  repos
    .map(repo => repo.langs)
    .reduce(
      (reveicer, langs) =>
        Object.entries(langs).reduce((reveicer, [lang, count]) => {
          if (lang in reveicer) {
            reveicer[lang].count += count
            reveicer[lang].repos++
          } else {
            reveicer[lang] = { count, repos: 1 }
          }
          return reveicer
        }, reveicer),
      {} as ReposLanguages
    )
