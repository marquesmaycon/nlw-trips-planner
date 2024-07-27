import { z } from "zod";

export const tripSchema = z.object({
  destination: z.string().min(2, 'O local deve ter no mínimo 2 caracteres'),
  startsAt: z.string().min(1, 'A data de início é obrigatória'),
  endsAt: z.string().min(1, 'A data de término é obrigatória'),
  emails_to_invite: z.array(z.string().email()).min(1, 'Deve haver pelo menos 1 convidado'),
  ownerName: z.string().min(3, 'O nome do organizador deve ter no mínimo 3 caracteres'),
  ownerEmail: z.string().email({ message: 'Email do organizador inválido' }),
})

export const tripDefaultValues = {
  destination: '',
  startsAt: '',
  endsAt: '',
  emails_to_invite: [],
  ownerName: '',
  ownerEmail: '',
}

export type TripSchema = z.infer<typeof tripSchema>

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

export type EditParticipantSchema = ParticipantSchema & {
  id: string
}