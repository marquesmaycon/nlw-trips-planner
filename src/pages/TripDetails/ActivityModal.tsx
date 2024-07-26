import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar, Tag, X } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { queryClient } from "../../App"
import Button from "../../components/Button"
import {
  useCreateActivity,
  useEditActivity
} from "../../hooks/queryAndMutations"
import {
  activityDefaultValues,
  ActivityForm,
  activitySchema,
} from "../../validation/schemas"
import { ActivitiesByDay } from "../../validation/types"

type ActivityModalProps = {
  setIsActivityModalOpen: (value: boolean) => void
  mode: "edit" | "create"
  activityId: string | null
}

const ActivityModal = ({
  setIsActivityModalOpen,
  mode,
  activityId,
}: ActivityModalProps) => {
  const { tripId } = useParams()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ActivityForm>({
    defaultValues: activityDefaultValues,
    resolver: zodResolver(activitySchema),
  })

  const crrAcitivity = queryClient
    .getQueryData<ActivitiesByDay[]>(["activities", tripId])
    ?.find((activity) =>
      activity.activities.find((activity) => activity.id === activityId)
    )
    ?.activities.find((activity) => activity.id === activityId)

  useEffect(() => {
    if (mode === "edit" && crrAcitivity) {
      reset(crrAcitivity)
    }
  }, [crrAcitivity])

  const { mutateAsync: createActivity } = useCreateActivity(tripId!)
  const { mutateAsync: editActivity } = useEditActivity(tripId!)

  async function onSubmit(data: ActivityForm) {
    mode === "edit"
      ? await editActivity({ id: activityId!, ...data })
      : await createActivity(data)
    setIsActivityModalOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {mode === "create" ? "Criar" : "Editar"} atividade
            </h2>
            <button type="button" onClick={() => setIsActivityModalOpen(false)}>
              <X className="text-zinc-400 size-5" />
            </button>
          </div>
          <p className="text-small text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="px-4 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <Tag className="size-5 text-zinc-400" />

            <input
              min=""
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              placeholder="Qual a atividade?"
              {...register("name")}
            />
          </div>

          <div className="px-4 flex-1 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <Calendar className="size-5 text-zinc-400" />

            <input
              type="datetime-local"
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

          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ActivityModal
