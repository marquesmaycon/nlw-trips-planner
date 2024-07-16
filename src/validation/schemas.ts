import { z } from "zod";

export const tripSchema = z.object({
  destination: z.string().min(2, 'O local deve ter no mínimo 2 caracteres'),
  starts_at: z.string().min(1, 'A data de início é obrigatória'),
  ends_at: z.string().min(1, 'A data de término é obrigatória'),
  emails_to_invite: z.array(z.string().email()).min(1, 'Deve haver pelo menos 1 convidado'),
  owner_name: z.string().min(3, 'O nome do organizador deve ter no mínimo 3 caracteres'),
  owner_email: z.string().email({ message: 'Email do organizador inválido' }),
})

export const tripDefaultValues = {
  destination: '',
  starts_at: '',
  ends_at: '',
  emails_to_invite: [],
  owner_name: '',
  owner_email: '',
}

export type TripForm = z.infer<typeof tripSchema>