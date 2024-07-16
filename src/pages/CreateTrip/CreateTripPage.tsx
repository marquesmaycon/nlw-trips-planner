import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  tripDefaultValues,
  TripForm,
  tripSchema,
} from "../../validation/schemas"
import ConfirmTripModal from "./ConfirmTripModal"
import InviteGuestsModal from "./InviteGuestsModal"
import DestinationAndDateStep from "./steps/DestinationAndDateStep"
import InviteGuestsStep from "./steps/InviteGuestsStep"

function CreateTripPage() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const hookForm = useForm<TripForm>({
    defaultValues: tripDefaultValues,
    resolver: zodResolver(tripSchema),
  })

  const errors = hookForm.formState.errors

  return (
    <FormProvider {...hookForm}>
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
            />

            {isGuestInputOpen && (
              <InviteGuestsStep
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                setIsGuestModalOpen={setIsGuestModalOpen}
              />
            )}

            <div>
              {Object.entries(errors).map(([field, error]) => (
                <p key={field} className="text-red-400 text-xs">
                  {error?.message}
                </p>
              ))}
            </div>
          </div>

          <div className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda
            <br /> com nossos
            <a href="#" className="text-zinc-300 underline">
              termos de uso
            </a>
            e
            <a href="#" className="text-zinc-300 underline">
              políticas de privacidade
            </a>
            .
          </div>
        </div>

        {isGuestModalOpen && (
          <InviteGuestsModal setIsGuestModalOpen={setIsGuestModalOpen} />
        )}

        {isConfirmModalOpen && (
          <ConfirmTripModal setIsConfirmModalOpen={setIsConfirmModalOpen} />
        )}
      </div>
    </FormProvider>
  )
}

export default CreateTripPage
