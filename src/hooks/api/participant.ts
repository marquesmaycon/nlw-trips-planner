import { useQuery, useMutation } from "@tanstack/react-query"
import { participantsController } from "../../controllers/ParticipantsController"
import { queryClient } from "../../lib/tanStackQuery"
import { ParticipantSchema, EditParticipantSchema } from "../../validation/schemas"

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