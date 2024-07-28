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
  id: number
  destination: string
  startsAt: string
  endsAt: string
}

export type Participant = {
  id: string
  name?: string
  email: string
  isConfirmed: boolean
}

export type Activity = {
  id: string
  name: string
  startsAt: string
  isDone: number
}

export type ActivitiesByDay = {
  date: string
  activities: Activity[]
}

export type Link = {
  id: string
  title?: string
  url: string
}

export type DestinationAndDateStepProps = {
  isGuestInputOpen: boolean
  setIsGuestInputOpen: (isOpen: boolean) => void
}

export type InviteGuestsStepProps = {
  setIsGuestModalOpen: (isOpen: boolean) => void
  setIsConfirmModalOpen: (isOpen: boolean) => void
}

export type ConfirmTripModalProps = {
  setIsConfirmModalOpen: (isOpen: boolean) => void
}

export type InviteGuestsModalProps = {
  setIsGuestModalOpen: Dispatch<SetStateAction<boolean>>
}

export type ActivityModalProps = {
  setIsActivityModalOpen: (value: boolean) => void
  activityId: string | null
}

export type GuestsModalProps = {
  setIsGuestsModalOpen: (value: boolean) => void
  participantId: string | null
}

export type LinkModalProps = {
  setIsLinkModalOpen: (value: boolean) => void
  linkId: string | null
}

export type DestinationAndDateModalProps = {
  setIsDestinationDateModalOpen: Dispatch<SetStateAction<boolean>>
}