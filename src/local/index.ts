import { Base64 } from '../utils/base64'

export namespace Local {
  const enum KEY {
    userAuth = 'loc:auth'
  }

  type UserAuth = {
    username: string
    password: string
  }

  export function saveUserAuth(username: string, password: string) {
    const userAuth: UserAuth = {
      username,
      password
    }

    const value = Base64.encode(JSON.stringify(userAuth))

    localStorage.setItem(KEY.userAuth, value)
  }

  export function getUserAuth() {
    const item = localStorage.getItem(KEY.userAuth)
    if (!item) return

    const value = Base64.decode(item)

    return JSON.parse(value) as UserAuth
  }

  export function clear() {
    localStorage.clear()
  }

  export function clearAuth() {
    localStorage.removeItem(KEY.userAuth)
  }
}
