import { format, parseISO } from "date-fns"
import { CircleCheck, CircleDashed, Pencil, Plus, Trash } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

import { ptBR } from "date-fns/locale"
import Button from "../../components/Button"
import { useDeleteAcitivity, useEditActivity, useGetActivities } from "../../hooks/queryAndMutations"
import { isBeforeRightNow } from "../../utils/functions"
import ActivityModal from "./ActivityModal"

const Activities = () => {
  const { tripId } = useParams()
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
  const [currActivityId, setCurrAcitivityId] = useState<string | null>(null)

  const { data: activities } = useGetActivities(tripId!)

  const { mutateAsync: editActivity } = useEditActivity(tripId!)
  const { mutateAsync: deleteActivity } = useDeleteAcitivity(tripId!)

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
            <div key={activity.date} className={`space-y-2.5 `}>
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia {format(parseISO(activity.date), "d")} {/* TO DO => ADD MÊS */}
                </span>
                <span className="text-xs text-zinc-500">{format(activity.date, "EEE", { locale: ptBR })}</span>
              </div>
              {activity.activities.length > 0 ? (
                <div className="space-y-2 5">
                  {activity.activities.map(({ id, isDone, startsAt, name }) => {
                    const isDoneOrLate = isDone === 1 || isBeforeRightNow(startsAt)
                    const toggleDone = () => editActivity({ id, isDone: isDone === 1 ? 0 : 1 })
                    return (
                      <div
                        key={id}
                        className={`group px-4 py-2.5 bg-zinc-900 shadow-shape rounded-xl flex items-center gap-3 ${
                          isDoneOrLate ? "opacity-60" : ""
                        }`}>
                        {isDone ? (
                          <CircleCheck className="size-5 text-lime-300 cursor-pointer" onClick={toggleDone} />
                        ) : (
                          <CircleDashed className="size-5 text-zinc-400 cursor-pointer" onClick={toggleDone} />
                        )}
                        <span className="text-zinc-100">{name}</span>
                        <span className="text-zinc-400 text-sm ml-auto">{format(startsAt, "HH'h'mm")}</span>
                        <Pencil
                          className="size-5 text-zinc-400 group-hover:text-lime-300 transition-all ease-in duration-200 cursor-pointer"
                          onClick={() => openEditModal(id)}
                        />
                        <Trash
                          className="size-5 text-zinc-400 group-hover:text-red-500 transition-all ease-in duration-200 cursor-pointer"
                          onClick={() => deleteActivity(id)}
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data</p>
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
