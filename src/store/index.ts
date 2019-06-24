import { createState } from '@saber2pr/redux/lib/state'
import { User } from '@saber2pr/types-github-api'
import { State } from '../state'

export const store = createState<State>({
  userId: '',
  password: '',
  userInfor: {
    public_repos: 0
  } as User,
  error: {
    status: 0,
    statusText: '',
    message: ''
  }
})
