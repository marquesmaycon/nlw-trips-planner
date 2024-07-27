import { api } from "../lib/axios"
import { TripSchema } from "../validation/schemas"
import { Trip } from "../validation/types"

class TripController<T extends Trip> {
  async getTrip(id: string): Promise<T> {
    const response = await api.get(`/trips/${id}`)
    return response.data
  }

  async createTrip(data: TripSchema): Promise<T> {
    const response = await api.post("/trips", data)
    return response.data
  }
}

export const tripController = new TripController()