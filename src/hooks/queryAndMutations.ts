import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../App"
import { activitiesController } from "../controllers/ActivitiesController"
import { tripController } from "../controllers/TripsController"
import { ActivityForm, EditActivitySchema } from "../validation/schemas"


export const useGetTrip = (tripId: string) => {
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => tripController.getTrip(tripId),
    enabled: !!tripId,
  })
}

export const useGetActivities = (tripId: string) => {
  return useQuery({
    queryKey: ["activities", tripId],
    queryFn: () => activitiesController.getActivitiesByDay(tripId),
    enabled: !!tripId,
  })
}

// export const useGetActivity = (tripId: string, activityId: string) => {
//   return useQuery({
//     queryKey: ["activity", tripId, activityId],
//     queryFn: () => activitiesController.getResource(activityId),
//     enabled: !!activityId,
//   })
// }

export const useCreateActivity = (tripId: string) => {
  return useMutation({
    mutationFn: (data: ActivityForm) => activitiesController.createResource(tripId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities", tripId] })
    }
  })
}

export const useEditActivity = (tripId: string) => {
  return useMutation({
    mutationFn: (data: EditActivitySchema) => activitiesController.editResource(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities", tripId] })
    }
  })
}

export const useDeleteAcitivity = (tripId: string) => {
  return useMutation({
    mutationFn: (activityId: string) => activitiesController.deleteResource(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities", tripId] })
    }
  })
}

export const useToggleActivityDone = (tripId: string) => {
  return useMutation({
    mutationFn: (data: { id: string, isDone: Number }) => activitiesController.editResource(data.id, {
      isDone: data.isDone === 1 ? 0 : 1,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities", tripId] })
    }
  })
}