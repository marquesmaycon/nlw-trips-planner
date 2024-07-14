import { User, X } from "lucide-react"
import React, { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { api } from "../../lib/axios"
import { ConfirmTripModalProps } from "../../types"
import { formatTripDate } from "../../utils/functions"

const ConfirmTripModal = ({
  setIsConfirmModalOpen,
  tripData,
  setTripData,
}: ConfirmTripModalProps) => {
  const navigate = useNavigate()

  const formattedDate =
    formatTripDate(tripData.date?.from, tripData.date?.to) ||
    "Você não selecionou uma data válida"

  function onNameChange(event: React.FormEvent<HTMLInputElement>) {
    const name = event.currentTarget.value
    setTripData((prev) => ({ ...prev, ownerName: name }))
  }

  function onEmailChange(event: React.FormEvent<HTMLInputElement>) {
    const email = event.currentTarget.value
    setTripData((prev) => ({ ...prev, ownerEmail: email }))
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { date, destination, guestsEmails, ownerEmail, ownerName } = tripData

    if (!date?.from || !date?.to) {
      console.warn("Data inválida")
      return
    }
    if (!destination) {
      console.warn("Destino inválido")
      return
    }
    if (!guestsEmails) {
      console.warn("Selecione seus convidados")
      return
    }
    if (!ownerName || !ownerEmail) {
      console.warn("Preencha seu nome e e-mail")
      return
    }

    const response = await api.post("/trips", {
      destination: destination,
      starts_at: date?.from,
      ends_at: date?.to,
      emails_to_invite: guestsEmails,
      owner_name: ownerName,
      owner_email: ownerEmail,
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
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
            <span className="font-semibold text-zinc-100">
              {tripData.destination}
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">{formattedDate}</span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form className="space-y-3" onSubmit={createTrip}>
          <div className="px-4 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <User className="size-5 text-zinc-400" />

            <input
              name="name"
              className="bg-transparent flex-1 outline-none"
              placeholder="Digite o e-mail do convidado"
              onChange={onNameChange}
            />
          </div>

          <div className="px-4  h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <User className="size-5 text-zinc-400" />

            <input
              type="email"
              name="email"
              className="bg-transparent flex-1 outline-none"
              placeholder="Seu e-mail pessoal"
              onChange={onEmailChange}
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
