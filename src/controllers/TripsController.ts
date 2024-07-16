import { api } from "../lib/axios"

class TripController {
  
  async getTrip(id: string) {
    const response = await api.get(`/trips/${id}`)
    return response.data
  }
}

export const tripController = new TripController()