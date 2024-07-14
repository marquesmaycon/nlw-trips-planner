import { ArrowRight, UserRoundPlus } from "lucide-react"
import Button from "../../../components/Button"
import { InviteGuestsStepProps } from "../../../types"

const InviteGuestsStep = ({
  guestEmails: emails,
  setIsConfirmModalOpen,
  setIsGuestModalOpen,
}: InviteGuestsStepProps) => {
  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
      <button
        type="button"
        onClick={() => setIsGuestModalOpen(true)}
        className="flex text-zinc-400 items-center gap-2 flex-1">
        <UserRoundPlus className=" size-5" />
        {emails.length > 0 ? (
          <span className="text-lg text-zinc-100">
            {emails.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-lg">Convidar amigos</span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      <Button type="button" onClick={() => setIsConfirmModalOpen(true)}>
        Confirmar viagem <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}

export default InviteGuestsStep
