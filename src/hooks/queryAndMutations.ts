import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../App"
import { activitiesController } from "../controllers/ActivitiesController"
import { tripController } from "../controllers/TripsController"
import { ActivitySchema, EditActivitySchema, EditLinkSchema, EditParticipantSchema, LinkSchema, ParticipantSchema } from "../validation/schemas"
import { participantsController } from "../controllers/ParticipantsController"
import { linksController } from "../controllers/LinksController"


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

export const useGetParticipants = (tripId: string) => {
  return useQuery({
    queryKey: ["participants", tripId],
    queryFn: () => participantsController.getResources(tripId),
    enabled: !!tripId,
  })
}

export const useCreateParticipant = (tripId: string) => {
  return useMutation({
    mutationFn: (data: ParticipantSchema) => participantsController.createResource(tripId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", tripId] })
    }
  })
}

export const useEditParticipant = (tripId: string) => {
  return useMutation({
    mutationFn: (data: EditParticipantSchema) => participantsController.editResource(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", tripId] })
    }
  })
}

export const useDeleteParticipant = (tripId: string) => {
  return useMutation({
    mutationFn: (participantId: string) => participantsController.deleteResource(participantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants", tripId] })
    }
  })
}

export const useGetLinks = (tripId: string) => {
  return useQuery({
    queryKey: ["links", tripId],
    queryFn: () => linksController.getResources(tripId),
    enabled: !!tripId,
  })
}

export const useCreateLink = (tripId: string) => {
  return useMutation({
    mutationFn: (data: LinkSchema) => linksController.createResource(tripId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", tripId] })
    }
  })
}

export const useEditLink = (tripId: string) => {
  return useMutation({
    mutationFn: (data: EditLinkSchema) => linksController.editResource(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", tripId] })
    }
  })
}

export const useDeleteLink = (tripId: string) => {
  return useMutation({
    mutationFn: (linkId: string) => linksController.deleteResource(linkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", tripId] })
    }
  })
}