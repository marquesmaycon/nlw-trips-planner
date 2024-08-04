import { useMutation, useQuery } from "@tanstack/react-query"
import { LoginSchema, RegisterAccountSchema } from "../../validation/schemas"
import { authController } from "../../controllers/AuthController"
import { api } from "../../lib/axios"
import { queryClient } from "../../lib/tanStackQuery"

function authenticate({ token }: any) {
  localStorage.setItem('userToken', token)
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterAccountSchema) => authController.register(data),
    onSuccess: authenticate
  })
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginSchema) => authController.login(data),
    onSuccess: authenticate
  })
}

export const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authController.logout(),
    onSuccess: () => {
      api.defaults.headers['Authorization'] = `Bearer ${null}`
      localStorage.removeItem('userToken')
      queryClient.invalidateQueries({ queryKey: ['me'] })
    }
  })
}

export const useMe = (token: string | null) => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => authController.me(),
    enabled: !!token,
  })
}