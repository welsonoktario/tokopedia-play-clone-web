import { useContext } from 'react'

import { AuthContext } from '@/components/AuthContext'
import { doFetch } from '@/helpers/fetch'
import { UserType } from '@/types/user'

export const useAuth = () => {
  const auth = useContext(AuthContext)!

  const login = async (username: string) => {
    if (username) {
      try {
        const data = await doFetch<UserType>(`/users/${username}`)
        auth.setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const logout = () => {
    if (auth.user) {
      document.cookie = 'auth=; expires=' + new Date(0).toUTCString()
      auth.setUser(undefined)
    }
  }

  return { ...auth, login, logout }
}
