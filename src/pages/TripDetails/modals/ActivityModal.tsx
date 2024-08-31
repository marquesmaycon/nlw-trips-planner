import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Calendar, Tag, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Button from "../../../components/Button"
import { queryClient } from "../../../libs/tanStackQuery"
import { activityDefaultValues, ActivitySchema, activitySchema } from "../../../validation/schemas"
import { ActivitiesByDay, ActivityModalProps, Trip } from "../../../validation/types"
import { useCreateActivity, useEditActivity } from "../../../hooks/api/activity"

const ActivityModal = ({ setIsActivityModalOpen, activityId }: ActivityModalProps) => {
  const { tripId } = useParams()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ActivitySchema>({
    defaultValues: activityDefaultValues,
    resolver: zodResolver(activitySchema),
  })

  const { mutateAsync: createActivity, isPending: isCreating } = useCreateActivity(tripId!)
  const { mutateAsync: editActivity, isPending: isEditing } = useEditActivity(tripId!)

  useEffect(() => {
    if (!activityId) return
    reset({ ...currAcitivity, startsAt: currAcitivity?.startsAt.slice(0, 16) })
  }, [activityId])

  const currAcitivity = queryClient
    .getQueryData<ActivitiesByDay[]>(["activities", tripId])
    ?.find((activity) => activity.activities.find((activity) => activity.id === activityId))
    ?.activities.find((activity) => activity.id === activityId)

  const tripDetails = queryClient.getQueryData<Trip>(["trip", tripId])
  console.log(currAcitivity?.startsAt.slice(0, 16))
  async function onSubmit(data: ActivitySchema) {
    activityId ? await editActivity({ id: activityId!, ...data }) : await createActivity(data)
    setIsActivityModalOpen(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{activityId ? "Editar" : "Criar"} atividade</h2>
            <button type="button" onClick={() => setIsActivityModalOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-small text-zinc-400">Todos convidados podem visualizar as atividades.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex h-14 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <Tag className="size-5 text-zinc-400" />

            <input
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              placeholder="Qual a atividade?"
              {...register("name")}
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5">
            <Calendar className="size-5 text-zinc-400" />

            <input
              type="datetime-local"
              min={tripDetails?.startsAt.slice(0, 16)}
              max={tripDetails?.endsAt.slice(0, 16)}
              placeholder="Data e horário da atividade"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              {...register("startsAt")}
            />
          </div>

          <div>
            {Object.entries(errors).map(([field, error]) => (
              <p key={field} className="text-xs text-red-400">
                {error?.message}
              </p>
            ))}
          </div>

          <Button type="submit" size="full" isLoading={isCreating || isEditing}>
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ActivityModal
