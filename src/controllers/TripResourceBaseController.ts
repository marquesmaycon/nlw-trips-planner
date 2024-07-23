import { api } from "../lib/axios"

export default class TripResourceBaseController<Resource = any> {
  constructor(protected resource: string) { }

  async getResources(tripId: string): Promise<Resource[]> {
    const response = await api.get(`/trips/${tripId}/${this.resource}`)
    return response.data
  }

  async createResource(tripId: string, data: Partial<Resource>): Promise<Resource> {
    const response = await api.post(`/trips/${tripId}/${this.resource}`, data)
    return response.data
  }

  async editResource(resourceId: string, data: Partial<Resource>): Promise<Resource> {
    console.log('editResource', resourceId, data)
    const response = await api.put(`/${this.resource}/${resourceId}`, data)
    return response.data
  }

  async deleteResource(resourceId: string): Promise<void> {
    const response = await api.delete(`/${this.resource}/${resourceId}`)
    return response.data
  }
}