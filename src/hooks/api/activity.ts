import { useQuery, useMutation } from "@tanstack/react-query"
import { activitiesController } from "../../controllers/ActivitiesController"
import { queryClient } from "../../libs/tanStackQuery"
import { ActivitySchema, EditActivitySchema } from "../../validation/schemas"

export const useGetActivities = (tripId: string) => {
  return useQuery({
    queryKey: ["activities", tripId],
    queryFn: () => activitiesController.getActivitiesByDay(tripId),
    enabled: !!tripId,
  })
}

export const useCreateActivity = (tripId: string) => {
  return useMutation({
    mutationFn: (data: ActivitySchema) => activitiesController.createResource(tripId, data),
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