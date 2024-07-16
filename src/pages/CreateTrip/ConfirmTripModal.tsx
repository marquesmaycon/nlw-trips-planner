import { User, X } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { api } from "../../lib/axios"
import { formatTripDate } from "../../utils/functions"
import { TripForm } from "../../validation/schemas"
import { ConfirmTripModalProps } from "../../validation/types"

const ConfirmTripModal = ({ setIsConfirmModalOpen }: ConfirmTripModalProps) => {
  const navigate = useNavigate()
  const { handleSubmit, watch, register } = useFormContext<TripForm>()

  const [destination, from, to] = watch(["destination", "starts_at", "ends_at"])

  const formattedDate =
    formatTripDate(from, to) || "Você não selecionou uma data válida"

  async function createTrip(data: TripForm) {
    const response = await api.post("/trips", data)

    const { id } = response.data
    navigate(`/trips/${id}`)
  }

  function onSubmitError() {
    setIsConfirmModalOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button type="button" onClick={() => setIsConfirmModalOpen(false)}>
              <X className="text-zinc-400 size-5" />
            </button>
          </div>
          <p className="text-small text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">{destination}</span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">{formattedDate}</span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit(createTrip, onSubmitError)}>
          <div className="px-4 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <User className="size-5 text-zinc-400" />

            <input
              className="bg-transparent flex-1 outline-none"
              placeholder="Digite o e-mail do convidado"
              {...register('owner_name')}
            />
          </div>

          <div className="px-4  h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <User className="size-5 text-zinc-400" />

            <input
              type="email"
              className="bg-transparent flex-1 outline-none"
              placeholder="Seu e-mail pessoal"
              {...register('owner_email')}
            />
          </div>

          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ConfirmTripModal
