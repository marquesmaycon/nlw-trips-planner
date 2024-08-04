import { z } from "zod";

export const registerAccountSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const registerAccountDefaultValues = {
  name: '',
  email: '',
  password: '',
}

export type RegisterAccountSchema = z.infer<typeof registerAccountSchema>

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const loginDefaultValues = {
  email: '',
  password: '',
}

export type LoginSchema = z.infer<typeof loginSchema>

export const tripSchema = z.object({
  destination: z.string().min(2, 'O local deve ter no mínimo 2 caracteres'),
  startsAt: z.string().min(1, 'A data de início é obrigatória'),
  endsAt: z.string().min(1, 'A data de término é obrigatória'),
  emails_to_invite: z.array(z.string().email()).min(1, 'Deve haver pelo menos 1 convidado')
})

export const tripDefaultValues = {
  destination: '',
  startsAt: '',
  endsAt: '',
  emails_to_invite: []
}

export type TripSchema = z.infer<typeof tripSchema>

export const editTripSchema = z.object({
  id: z.number(),
  destination: z.string().min(2, 'O local deve ter no mínimo 2 caracteres'),
  startsAt: z.string().min(1, 'A data de início é obrigatória'),
  endsAt: z.string().min(1, 'A data de término é obrigatória'),
})

export type EditTripSchema = z.infer<typeof editTripSchema>

export const activitySchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  startsAt: z.string().min(1, 'A data da atividade é obrigatória'),
})

export const activityDefaultValues = {
  name: '',
  startsAt: '',
}

export type ActivitySchema = z.infer<typeof activitySchema>

export type EditActivitySchema = Partial<ActivitySchema> & {
  id: string
  isDone?: number
}

export const linkSchema = z.object({
  title: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  url: z.string().url('url inválida').min(1, 'A data da atividade é obrigatória'),
})

export const linkDefaultValues = {
  title: '',
  url: '',
}

export type LinkSchema = z.infer<typeof linkSchema>

export type EditLinkSchema = LinkSchema & {
  id: string
}

export const participantSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.string().email({ message: 'Email inválido' }),
})

export const participantDefaultValues = {
  name: '',
  email: '',
}

export type ParticipantSchema = z.infer<typeof participantSchema>

export type EditParticipantSchema = Partial<ParticipantSchema> & {
  id: string
  isConfirmed?: boolean
}