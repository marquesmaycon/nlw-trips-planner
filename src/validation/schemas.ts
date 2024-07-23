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

export type TripForm = z.infer<typeof tripSchema>

export const activitySchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  startsAt: z.string().min(1, 'A data da atividade é obrigatória'),
})

export const activityDefaultValues = {
  name: '',
  startsAt: '2024-07-28T20:05',
}

export type ActivityForm = z.infer<typeof activitySchema>