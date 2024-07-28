import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useFormContext } from "react-hook-form"
import { User, X } from "lucide-react"

import Button from "../../components/Button"
import { TripSchema } from "../../validation/schemas"
import { ConfirmTripModalProps } from "../../validation/types"
import { formatTripDate } from "../../utils/functions"
import { tripController } from "../../controllers/TripsController"

const ConfirmTripModal = ({ setIsConfirmModalOpen }: ConfirmTripModalProps) => {
  const navigate = useNavigate()
  const { handleSubmit, watch, register } = useFormContext<TripSchema>()

  const [destination, from, to] = watch(["destination", "startsAt", "endsAt"])

  const { mutateAsync: createTrip, isPending } = useMutation({
    mutationFn: (data: TripSchema) => tripController.createTrip(data),
    onSuccess: (data) => {
      navigate(`/trips/${data.id}`)
    },
  })

  const formattedDate = formatTripDate(from, to) || "Você não selecionou uma data válida"

  async function onSubmit(data: TripSchema) {
    await createTrip(data)
  }

  function onSubmitError() {
    setIsConfirmModalOpen(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
            <button type="button" onClick={() => setIsConfirmModalOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-small text-zinc-400">
            Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">{destination}</span> nas datas de{" "}
            <span className="font-semibold text-zinc-100">{formattedDate}</span> preencha seus dados abaixo:
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit, onSubmitError)}>
          <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <User className="size-5 text-zinc-400" />

            <input className="flex-1 bg-transparent outline-none" placeholder="Digite o e-mail do convidado" {...register("ownerName")} />
          </div>

          <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <User className="size-5 text-zinc-400" />

            <input type="email" className="flex-1 bg-transparent outline-none" placeholder="Seu e-mail pessoal" {...register("ownerEmail")} />
          </div>

          <Button type="submit" size="full" isLoading={isPending}>
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ConfirmTripModal
