import { useQuery, useMutation } from "@tanstack/react-query"
import { tripController } from "../../controllers/TripsController"
import { queryClient } from "../../libs/tanStackQuery"
import { EditTripSchema, TripSchema } from "../../validation/schemas"

export const useGetTrips = () => {
  return useQuery({
    queryKey: ["trips"],
    queryFn: tripController.getTrips,
  })
}

export const useGetTrip = (tripId: string) => {
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => tripController.getTrip(tripId),
    enabled: !!tripId,
  })
}

export const useCreateTrip = () => {
  return useMutation({
    mutationFn: (data: TripSchema) => tripController.createTrip(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] })
    }
  })
}

export const useEditTrip = (tripId: string) => {
  return useMutation({
    mutationFn: (data: EditTripSchema) => tripController.editTrip(tripId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", tripId] })
      queryClient.invalidateQueries({ queryKey: ["activities", tripId] })
    }
  })
}