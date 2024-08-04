import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { tripDefaultValues, TripSchema, tripSchema } from "../../validation/schemas"
import InviteGuestsModal from "./InviteGuestsModal"
import DestinationAndDateStep from "./steps/DestinationAndDateStep"
import InviteGuestsStep from "./steps/InviteGuestsStep"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { useCreateTrip } from "../../hooks/api/trip"

function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)

  const hookForm = useForm<TripSchema>({
    defaultValues: tripDefaultValues,
    resolver: zodResolver(tripSchema),
  })

  const { mutateAsync: createTrip } = useCreateTrip()

  const onSubmit = async (data: TripSchema) => {
    const trip = await createTrip(data)
    navigate(`/trips/${trip.id}`)
  }

  const errors = hookForm.formState.errors

  return (
    <FormProvider {...hookForm}>
      <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
        <div className="w-full max-w-3xl space-y-10 px-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="Plann.er" className="" />
            <p className="text-lg text-zinc-300">Convide seus amigos e planeje sua próxima viagem!</p>
          </div>

          <form onSubmit={hookForm.handleSubmit(onSubmit)} className="space-y-4">
            <DestinationAndDateStep isGuestInputOpen={isGuestInputOpen} setIsGuestInputOpen={setIsGuestInputOpen} />

            {isGuestInputOpen && <InviteGuestsStep setIsGuestModalOpen={setIsGuestModalOpen} />}

            <div>
              {Object.entries(errors).map(([field, error]) => (
                <p key={field} className="text-xs text-red-400">
                  {error?.message}
                </p>
              ))}
            </div>
          </form>

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

          <div className="mt-5 flex justify-center">
            <Link to="/">
              <Button variant="secondary" type="button">
                Minhas viagens
              </Button>
            </Link>
          </div>
        </div>

        {isGuestModalOpen && <InviteGuestsModal setIsGuestModalOpen={setIsGuestModalOpen} />}
      </div>
    </FormProvider>
  )
}

export default CreateTripPage
