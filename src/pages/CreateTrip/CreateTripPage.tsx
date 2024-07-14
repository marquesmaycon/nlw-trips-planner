import { useState } from "react"
import ConfirmTripModal from "./ConfirmTripModal"
import InviteGuestsModal from "./InviteGuestsModal"
import DestinationAndDateStep from "./steps/DestinationAndDateStep"
import InviteGuestsStep from "./steps/InviteGuestsStep"
import { TripData } from "../../types"

function CreateTripPage() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const [tripData, setTripData] = useState<TripData>({
    destination: "",
    date: undefined,
    guestsEmails: ["mayconmarquesh@gmail.com", "mayconmarquesm@live.com"],
    ownerName: "",
    ownerEmail: "",
  })

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col gap-3 items-center">
          <img src="/logo.svg" alt="Plann.er" className="" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestInputOpen={isGuestInputOpen}
            setIsGuestInputOpen={setIsGuestInputOpen}
            tripData={tripData}
            setTripData={setTripData}
          />

          {isGuestInputOpen && (
            <InviteGuestsStep
              guestEmails={tripData.guestsEmails}
              setIsConfirmModalOpen={setIsConfirmModalOpen}
              setIsGuestModalOpen={setIsGuestModalOpen}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br /> com nossos
          <a href="" className="text-zinc-300 underline">
            termos de uso
          </a>
          e
          <a href="" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestsModal
          setIsGuestModalOpen={setIsGuestModalOpen}
          tripData={tripData}
          setTripData={setTripData}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmTripModal
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          tripData={tripData}
          setTripData={setTripData}
        />
      )}
    </div>
  )
}

export default CreateTripPage
