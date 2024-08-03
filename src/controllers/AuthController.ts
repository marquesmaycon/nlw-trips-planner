import { api } from "../lib/axios"
import { RegisterAccountSchema, LoginSchema } from "../validation/schemas"

class AuthController {
  async register(data: RegisterAccountSchema): Promise<any> {
    const response = await api.post('/auth/register', data)
    return response.data
  }

  async login(data: LoginSchema): Promise<any> {
    const response = await api.post("/auth/login", data)
    return response.data
  }

  // async logout(): Promise<any> {
  //   const response = await api.post("/auth/logout", data)
  //   return response.data
  // }
}

export const authController = new AuthController()