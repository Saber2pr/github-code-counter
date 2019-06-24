import { User } from '@saber2pr/types-github-api'

export interface State {
  userInfor: User
  userId: string
  password: string
  error: {
    status: number
    statusText: string
    message: string
  }
}
