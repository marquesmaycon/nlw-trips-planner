import { Dispatch, SetStateAction } from "react"
import { DateRange } from "react-day-picker"

export type TripData = {
  destination: string
  date: DateRange | undefined
  guestsEmails: string[]
  ownerName: string
  ownerEmail: string
}

export type Trip = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export type Participant = {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export type Activity = {
  date: string
  activities: Array<{
    id: string
    title: string
    occurs_at: string
  }>
}

export type DestinationAndDateStepProps = {
  isGuestInputOpen: boolean
  setIsGuestInputOpen: (isOpen: boolean) => void
  tripData: TripData
  setTripData: Dispatch<SetStateAction<TripData>>
}

export type InviteGuestsStepProps = {
  guestEmails: string[]
  setIsGuestModalOpen: (isOpen: boolean) => void
  setIsConfirmModalOpen: (isOpen: boolean) => void
}

export type ConfirmTripModalProps = {
  setIsConfirmModalOpen: (isOpen: boolean) => void
  tripData: TripData
  setTripData: Dispatch<SetStateAction<TripData>>
}

export type InviteGuestsModalProps = {
  tripData: TripData
  setTripData: Dispatch<SetStateAction<TripData>>
  setIsGuestModalOpen: Dispatch<SetStateAction<boolean>>
}