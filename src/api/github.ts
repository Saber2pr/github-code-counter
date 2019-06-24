/*
 * @Author: saber2pr
 * @Date: 2019-06-19 20:08:30
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-24 10:47:47
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
import { async_map, range } from '@saber2pr/fp'

const MAX_REQUEST_LIMIT = 6

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

  if (result) return result.data
  return Promise.reject(`getPage Error.${url}:${JSON.stringify(extraParams)}`)
}

export async function getRepoLangs(userId: string, repo: string) {
  const result = await axios.get<Languages>(
    `${GitHubAPI.repo}/${userId}/${repo}/languages`
  )

  return result.data
}

const batchedReposRequest = (userId: string, repos: Repository[]) =>
  async_map(
    repos.filter(r => !r.fork),
    async repo =>
      <RepoLang>{
        name: repo.name,
        langs: await getRepoLangs(userId, repo.name).catch(() => ({}))
      }
  )

const batchedRepoPagesRequest = async (userId: string, pages: number[]) =>
  Promise.all(
    pages.map(page => getUserReposPage(userId, page, MAX_REQUEST_LIMIT))
  )

export async function getAllRepoLangs(
  userId: string,
  onProgress?: (value: RepoLang[]) => void
) {
  const result: RepoLang[] = []

  const request = async (pageStart: number = 1): Promise<RepoLang[]> => {
    const reposMap = await batchedRepoPagesRequest(userId, [
      ...range(pageStart, pageStart + MAX_REQUEST_LIMIT)
    ])

    const batchedRequestTasks = reposMap.map(repos =>
      batchedReposRequest(userId, repos)
    )

    for await (const response of batchedRequestTasks) {
      if (!response.length) {
        onProgress && onProgress(result)
        return result
      }

      result.push(...response)
      onProgress && onProgress(result)
    }

    return await request(pageStart + MAX_REQUEST_LIMIT)
  }

  return await request()
}
