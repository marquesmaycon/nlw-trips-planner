import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { useLogout } from "../../hooks/queryAndMutations"
import { tripDefaultValues, TripSchema, tripSchema } from "../../validation/schemas"
import ConfirmTripModal from "./ConfirmTripModal"
import InviteGuestsModal from "./InviteGuestsModal"
import DestinationAndDateStep from "./steps/DestinationAndDateStep"
import InviteGuestsStep from "./steps/InviteGuestsStep"

function CreateTripPage() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const { mutateAsync: logout } = useLogout()

  const hookForm = useForm<TripSchema>({
    defaultValues: tripDefaultValues,
    resolver: zodResolver(tripSchema),
  })

  const errors = hookForm.formState.errors

  return (
    <FormProvider {...hookForm}>
      <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
        <div className="w-full max-w-3xl space-y-10 px-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="Plann.er" className="" />
            <p className="text-lg text-zinc-300">Convide seus amigos e planeje sua próxima viagem!</p>
          </div>

          <div className="space-y-4">
            <DestinationAndDateStep isGuestInputOpen={isGuestInputOpen} setIsGuestInputOpen={setIsGuestInputOpen} />

            {isGuestInputOpen && <InviteGuestsStep setIsConfirmModalOpen={setIsConfirmModalOpen} setIsGuestModalOpen={setIsGuestModalOpen} />}

            <div>
              {Object.entries(errors).map(([field, error]) => (
                <p key={field} className="text-xs text-red-400">
                  {error?.message}
                </p>
              ))}
            </div>
          </div>

          <div className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda
            <br /> com nossos&nbsp;
            <a href="#" className="text-zinc-300 underline decoration-lime-300">
              termos de uso
            </a>
            &nbsp;e&nbsp;
            <a href="#" className="text-zinc-300 underline decoration-lime-300">
              políticas de privacidade
            </a>
            .
          </div>

          <span className="cursor-pointer" onClick={() => logout()}>
            Logout
          </span>
        </div>

        {isGuestModalOpen && <InviteGuestsModal setIsGuestModalOpen={setIsGuestModalOpen} />}

        {isConfirmModalOpen && <ConfirmTripModal setIsConfirmModalOpen={setIsConfirmModalOpen} />}
      </div>
    </FormProvider>
  )
}

export default CreateTripPage
