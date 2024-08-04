import { api } from "../libs/axios"
import { RegisterAccountSchema, LoginSchema } from "../validation/schemas"
import { User } from "../validation/types"

class AuthController {
  async register(data: RegisterAccountSchema): Promise<any> {
    const response = await api.post('/auth/register', data)
    return response.data
  }

  async login(data: LoginSchema): Promise<any> {
    const response = await api.post("/auth/login", data)
    return response.data
  }

  async logout(): Promise<any> {
    const response = await api.delete("/auth/logout")
    return response.data
  }

  async me(): Promise<User> {
    const response = await api.get("/auth/me")
    return response.data
  }
}

export const authController = new AuthController()