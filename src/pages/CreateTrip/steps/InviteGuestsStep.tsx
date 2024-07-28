import { ArrowRight, UserRoundPlus } from "lucide-react"
import { useFormContext } from "react-hook-form"

import Button from "../../../components/Button"
import { TripSchema } from "../../../validation/schemas"
import { InviteGuestsStepProps } from "../../../validation/types"

const InviteGuestsStep = ({ setIsConfirmModalOpen, setIsGuestModalOpen }: InviteGuestsStepProps) => {
  const { watch } = useFormContext<TripSchema>()
  const emails = watch("emails_to_invite")

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <button type="button" onClick={() => setIsGuestModalOpen(true)} className="flex flex-1 items-center gap-2 text-zinc-400">
        <UserRoundPlus className="size-5" />
        {emails.length > 0 ? (
          <span className="text-lg text-zinc-100">{emails.length} pessoa(s) convidada(s)</span>
        ) : (
          <span className="text-lg">Convidar amigos</span>
        )}
      </button>

      <div className="h-6 w-px bg-zinc-800" />

      <Button type="button" onClick={() => setIsConfirmModalOpen(true)}>
        Confirmar viagem <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}

export default InviteGuestsStep
