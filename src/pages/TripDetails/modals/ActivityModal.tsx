import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Calendar, Tag, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


import Button from "../../../components/Button"
import { queryClient } from "../../../lib/tanStackQuery"
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

  const { mutateAsync: createActivity, isPending: isCreating} = useCreateActivity(tripId!)
  const { mutateAsync: editActivity, isPending: isEditing } = useEditActivity(tripId!)
  
  useEffect(() => {
    if (!activityId) return
    reset(currAcitivity)
  }, [activityId])

  const currAcitivity = queryClient
    .getQueryData<ActivitiesByDay[]>(["activities", tripId])
    ?.find((activity) => activity.activities.find((activity) => activity.id === activityId))
    ?.activities.find((activity) => activity.id === activityId)
  
  const tripDetails = queryClient.getQueryData<Trip>(["trip", tripId])

  async function onSubmit(data: ActivitySchema) {
    activityId ? await editActivity({ id: activityId!, ...data }) : await createActivity(data)
    setIsActivityModalOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{activityId ? "Editar" : "Criar"} atividade</h2>
            <button type="button" onClick={() => setIsActivityModalOpen(false)}>
              <X className="text-zinc-400 size-5" />
            </button>
          </div>
          <p className="text-small text-zinc-400">Todos convidados podem visualizar as atividades.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="px-4 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <Tag className="size-5 text-zinc-400" />

            <input
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              placeholder="Qual a atividade?"
              {...register("name")}
            />
          </div>

          <div className="px-4 flex-1 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <Calendar className="size-5 text-zinc-400" />

            <input
              type="datetime-local"
              min={tripDetails?.startsAt.split(".")[0]}
              max={tripDetails?.endsAt.split(".")[0]}
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              {...register("startsAt")}
            />
          </div>

          <div>
            {Object.entries(errors).map(([field, error]) => (
              <p key={field} className="text-red-400 text-xs">
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
