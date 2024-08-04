import { useQuery, useMutation } from "@tanstack/react-query"
import { linksController } from "../../controllers/LinksController"
import { queryClient } from "../../lib/tanStackQuery"
import { LinkSchema, EditLinkSchema } from "../../validation/schemas"

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