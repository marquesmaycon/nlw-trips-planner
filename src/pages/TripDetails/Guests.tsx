import { useState } from "react"
import { useParams } from "react-router-dom"
import { CheckCircle2, CircleDashed, UserCog } from "lucide-react"

import Button from "../../components/Button"
import GuestsModal from "./modals/GuestsModal"
import { useEditParticipant, useGetParticipants } from "../../hooks/api/participant"

const Guests = () => {
  const { tripId } = useParams()
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [currGuestId, setCurrGuestId] = useState<string | null>(null)

  const { data: participants } = useGetParticipants(tripId!)
  const { mutateAsync: toggleConfirmParticipant } = useEditParticipant(tripId!)

  function createParticipant() {
    setIsGuestsModalOpen(true)
    setCurrGuestId(null)
  }

  function editParticipant(id: string) {
    setCurrGuestId(id)
    setIsGuestsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants?.map((participant, index) => {
          const toggleConfirm = () => toggleConfirmParticipant({ id: participant.id, isConfirmed: !participant.isConfirmed })
          return (
            <div key={participant.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block cursor-pointer font-medium text-zinc-100" onClick={() => editParticipant(participant.id)}>
                  {participant.name || `Convidado ${index}`}
                </span>
                <span className="block shrink-0 truncate text-xs text-zinc-400">{participant.email}</span>
              </div>
              {participant.isConfirmed ? (
                <CheckCircle2 className="size-5 cursor-pointer text-green-400" onClick={toggleConfirm} />
              ) : (
                <CircleDashed className="size-5 cursor-pointer text-zinc-400" onClick={toggleConfirm} />
              )}
            </div>
          )
        })}
      </div>

      <Button variant="secondary" size="full" onClick={createParticipant}>
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isGuestsModalOpen && <GuestsModal setIsGuestsModalOpen={setIsGuestsModalOpen} participantId={currGuestId} />}
    </div>
  )
}

export default Guests
