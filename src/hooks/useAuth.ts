import { useMe } from "./api/auth"

export const useAuth = () => {
  const localToken = localStorage.getItem('userToken')
  
  const { data: user } = useMe(localToken)

  return !!user ? user : null
}