import { zodResolver } from "@hookform/resolvers/zod"
import { AtSign, CircleUser, Plus, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { queryClient } from "../../../App"
import Button from "../../../components/Button"
import { useCreateParticipant, useDeleteParticipant, useEditParticipant } from "../../../hooks/queryAndMutations"
import { participantDefaultValues, ParticipantSchema, participantSchema } from "../../../validation/schemas"
import { Participant } from "../../../validation/types"
import { useEffect } from "react"

type GuestsModalProps = {
  setIsGuestsModalOpen: (value: boolean) => void
  participantId: string | null
}

const GuestsModal = ({ setIsGuestsModalOpen, participantId }: GuestsModalProps) => {
  const { tripId } = useParams()

  const { handleSubmit, register, reset } = useForm<ParticipantSchema>({
    defaultValues: participantDefaultValues,
    resolver: zodResolver(participantSchema),
  })

  useEffect(() => {
    if (!participantId) return
    reset(currGuest)
  }, [participantId])

  const { mutateAsync: createParticipant, isPending: isCreating } = useCreateParticipant(tripId!)
  const { mutateAsync: editParticipant, isPending: isEditing } = useEditParticipant(tripId!)
  const { mutateAsync: deleteParticipant, variables } = useDeleteParticipant(tripId!)

  async function onSubmit(data: ParticipantSchema) {
    if (participantId) {
      await editParticipant({ ...data, id: participantId })
      setIsGuestsModalOpen(false)
      reset(participantDefaultValues)
    } else {
      await createParticipant(data)
    }
  }

  const guests = queryClient.getQueryData<Participant[]>(["participants", tripId])
  const currGuest = guests?.find((guest) => guest.id === participantId)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{participantId ? "Editar convidado" : "Selecionar convidados"}</h2>
            <button type="button" onClick={() => setIsGuestsModalOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-small text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {guests?.map((guest) => (
            <div
              key={guest.id}
              className={`flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5 ${[variables, participantId].includes(guest.id) ? "animate-pulse" : ""}`}>
              <span className="text-zinc-300">{guest.name || guest.email}</span>
              <button type="button">
                <X className="size-4 text-zinc-400" onClick={() => deleteParticipant(guest.id)} />
              </button>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <CircleUser className="size-5 text-zinc-400" />

            <input
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              placeholder="Digite o nome do convidado"
              {...register("name")}
            />
          </div>

          <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <AtSign className="size-5 text-zinc-400" />

            <input
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              placeholder="Digite o e-mail do convidado"
              {...register("email")}
            />
          </div>

          <Button type="submit" size="full" isLoading={isCreating || isEditing}>
            {participantId ? (
              "Editar convidado"
            ) : (
              <div>
                "Adicionar convidado"
                <Plus className="size-5" />
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default GuestsModal
