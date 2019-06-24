import { getUserInfor } from '../api'
import { AsyncAction } from '@saber2pr/redux/lib/state'
import { State } from '../state'
import { User } from '@saber2pr/types-github-api'
import H from '@saber2pr/router'

export namespace Action {
  export const login = (
    userId: string,
    password: string
  ): AsyncAction<Promise<User>, State> => async dispatch => {
    dispatch('userId', userId)
    dispatch('password', password)

    const user = await getUserInfor(userId)

    dispatch('userInfor', user)
    H.pushHash('/main')

    return user
  }
}
