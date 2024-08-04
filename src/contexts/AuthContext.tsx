import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { User } from "../validation/types"
import { useMe } from "../hooks/queryAndMutations"
import { queryClient } from "../lib/tanStackQuery"

export const AuthContext = createContext<User | undefined>(undefined)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  // const [user, setUser] = useState<User | undefined>(undefined)

  const { data: user } = useMe(queryClient.getQueryData(["me"]) ?? localStorage.getItem("userToken"))

  // useEffect(() => {
  //   if (data) {
  //     setUser(data)
  //   }
  // }, [data])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)

  if (authContext === null) {
    throw new Error("useAuthContext must be used within an AuthContextProvider")
  }

  return authContext
}
