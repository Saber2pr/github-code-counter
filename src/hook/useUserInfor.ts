import { useState, useEffect } from 'react'
import { getUserInfor } from '../api'
import { User } from '@saber2pr/types-github-api'

export const useUserInfor = (userId: string) => {
  const [userInfor, setter] = useState<User>()

  useEffect(() => {
    getUserInfor(userId).then(setter)
  }, [userId])

  return userInfor
}
