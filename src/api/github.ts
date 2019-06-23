/*
 * @Author: saber2pr
 * @Date: 2019-06-19 20:08:30
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-23 16:32:06
 */
import { GitHubAPI } from './url'
import {
  User,
  Repositories,
  Events,
  Search,
  Users,
  Repository
} from '@saber2pr/types-github-api'
import { Languages, RepoLang } from './types'
import { axios } from './http'
import { async_map } from '@saber2pr/fp'

export const getUserInfor = async (userId: string) =>
  await getPage<User>(`${GitHubAPI.users}/${userId}`)

export const getUserReposPage = async (
  userId: string,
  page: number = 1,
  per_page: number = 10
) =>
  await getPage<Repositories>(
    `${GitHubAPI.users}/${userId}/repos`,
    page,
    per_page
  )

export const getUserEvents = async (
  userId: string,
  page: number = 1,
  per_page: number = 10
) =>
  await getPage<Events>(`${GitHubAPI.users}/${userId}/events`, page, per_page)

export const searchRepos = async (
  q: string,
  page: number = 1,
  per_page: number = 10
) =>
  await getPage<Search<Repository>>(
    `${GitHubAPI.search}/repositories`,
    page,
    per_page,
    {
      q
    }
  )

export const getUserFollowersPage = async (
  userId: string,
  page: number = 1,
  per_page: number = 10
) =>
  await getPage<Users>(`${GitHubAPI.users}/${userId}/followers`, page, per_page)

export const getUserFollowingPage = async (
  userId: string,
  page: number = 1,
  per_page: number = 10
) =>
  await getPage<Users>(`${GitHubAPI.users}/${userId}/following`, page, per_page)

export const getUserStarred = async (
  userId: string,
  page: number = 1,
  per_page: number = 10
) =>
  await getPage<Repositories>(
    `${GitHubAPI.users}/${userId}/starred`,
    page,
    per_page
  )

export async function getPage<T>(
  url: string,
  page: number = 1,
  per_page: number = 10,
  extraParams: Object = {}
) {
  const result = await axios.get<T>(url, {
    params: {
      page,
      per_page,
      ...extraParams
    }
  })

  return result.data
}

export async function getRepoLangs(userId: string, repo: string) {
  const result = await axios.get<Languages>(
    `${GitHubAPI.repo}/${userId}/${repo}/languages`
  )

  return result.data
}

export async function getAllRepoLangs(
  userId: string,
  onProgress?: (res: RepoLang[]) => void
) {
  let current = 1
  let repos = await getUserReposPage(userId, current)

  const result: RepoLang[] = []

  while (repos.length) {
    const repoInfors = await async_map(repos, async repo => {
      const langs = await getRepoLangs(userId, repo.name).catch(() => ({}))
      return {
        name: repo.name,
        langs
      }
    })

    result.push(...repoInfors)

    onProgress && onProgress(result)

    repos = await getUserReposPage(userId, ++current)
  }

  return result
}
