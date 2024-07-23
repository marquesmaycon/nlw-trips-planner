import { api } from "../lib/axios"
import { ActivitiesByDay, Activity } from "../validation/types"
import TripResourceBaseController from "./TripResourceBaseController"

class ActivitiesController extends TripResourceBaseController<Activity> {
  constructor() {
    super('activities')
  }

  async getActivitiesByDay(tripId?: string): Promise<ActivitiesByDay[]> {
    if (!tripId) []
    const response = await api.get(`/trips/${tripId}/${this.resource}/by-day`)
    return response.data
  }
}

export const activitiesController = new ActivitiesController()