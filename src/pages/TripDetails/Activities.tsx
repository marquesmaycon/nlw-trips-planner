import { useState } from "react"
import { useParams } from "react-router-dom"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CircleCheck, CircleDashed, Pencil, Plus, Trash } from "lucide-react"

import Button from "../../components/Button"
import { isBeforeRightNow } from "../../utils/functions"
import ActivityModal from "./modals/ActivityModal"
import { useDeleteAcitivity, useEditActivity, useGetActivities } from "../../hooks/api/activity"

const Activities = () => {
  const { tripId } = useParams()
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
  const [currActivityId, setCurrAcitivityId] = useState<string | null>(null)

  const { data: activities } = useGetActivities(tripId!)

  const { mutateAsync: editActivity } = useEditActivity(tripId!)
  const { mutateAsync: deleteActivity, variables } = useDeleteAcitivity(tripId!)

  function openEditModal(activityId: string) {
    setIsActivityModalOpen(true)
    setCurrAcitivityId(activityId)
  }

  function openCreateModal() {
    setIsActivityModalOpen(true)
    setCurrAcitivityId(null)
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Atividades</h2>
        <Button onClick={openCreateModal}>
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>

      <div className="space-y-8">
        {activities?.map((activity) => {
          return (
            <div key={activity.date} className={`space-y-2.5`}>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold text-zinc-300">
                  Dia {format(parseISO(activity.date), "d")} {/* TO DO => ADD MÊS */}
                </span>
                <span className="text-xs text-zinc-500">{format(activity.date, "EEE", { locale: ptBR })}</span>
              </div>
              {activity.activities.length > 0 ? (
                <div className="5 space-y-2">
                  {activity.activities.map(({ id, isDone, startsAt, name }) => {
                    const isDoneOrLate = isDone === 1 || isBeforeRightNow(startsAt)
                    const toggleDone = () => editActivity({ id, isDone: isDone === 1 ? 0 : 1 })
                    return (
                      <div
                        key={id}
                        className={`group flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape ${isDoneOrLate ? "opacity-60" : ""} ${variables == id ? "animate-pulse" : ""}`}>
                        {isDone ? (
                          <CircleCheck className="size-5 cursor-pointer text-lime-300" onClick={toggleDone} />
                        ) : (
                          <CircleDashed className="size-5 cursor-pointer text-zinc-400" onClick={toggleDone} />
                        )}
                        <span className="text-zinc-100">{name}</span>
                        <span className="ml-auto text-sm text-zinc-400">{format(startsAt, "HH'h'mm")}</span>
                        <Pencil
                          className="size-5 cursor-pointer text-zinc-400 transition-all duration-200 ease-in group-hover:text-lime-300"
                          onClick={() => openEditModal(id)}
                        />
                        <Trash
                          className="size-5 cursor-pointer text-zinc-400 transition-all duration-200 ease-in group-hover:text-red-500"
                          onClick={() => deleteActivity(id)}
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">Nenhuma atividade cadastrada nessa data</p>
              )}
            </div>
          )
        })}

        {isActivityModalOpen && <ActivityModal setIsActivityModalOpen={setIsActivityModalOpen} activityId={currActivityId} />}
      </div>
    </div>
  )
}

export default Activities
