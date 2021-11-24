import { useAuthContext } from './useAuthContext'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const logout = () => {
    signOut(auth)
      .then(() => dispatch({ type: 'LOGOUT' }))
      .catch((err) => console.log('error'))
  }
  return { logout }
}
