import { CircleCheck, CircleDashed, Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ActivitiesByDay } from "../../validation/types"
import { format, parseISO } from "date-fns"

import { ptBR } from "date-fns/locale"
import { activitiesController } from "../../controllers/ActivitiesController"
import CreateActivityModal from "./CreateActivityModal"
import Button from "../../components/Button"
import { isBeforeRightNow } from "../../utils/functions"

const Activities = () => {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<ActivitiesByDay[]>([])
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)

  useEffect(() => {
    fetchActivities()
  }, [tripId])

  const fetchActivities = async () => {
    if (!tripId) return
    const activities = await activitiesController.getActivitiesByDay(tripId)
    setActivities(activities)
  }

  const excluirAtividade = async (id: string) => {
    await activitiesController.deleteResource(id)
    fetchActivities()
  }

  const toggleActvtDone = async (id: string, isDone: number) => {
    await activitiesController.editResource(id, {
      isDone: isDone === 1 ? 0 : 1,
    })
    fetchActivities()
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Atividades</h2>
        <Button onClick={() => setIsActivityModalOpen(true)}>
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>

      <div className="space-y-8">
        {activities?.map((activity) => {
          // TO DO => melhorar feedback visual de dias passados
          return (
            <div key={activity.date} className={`space-y-2.5 `}>
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia {format(parseISO(activity.date), "d")}{" "}
                  {/* TO DO => ADD MÊS */}
                </span>
                <span className="text-xs text-zinc-500">
                  {format(activity.date, "EEE", { locale: ptBR })}
                </span>
              </div>
              {activity.activities.length > 0 ? (
                <div className="space-y-2 5">
                  {activity.activities.map((item) => {
                    const isDoneOrLate =
                      item.isDone === 1 || isBeforeRightNow(item.startsAt)
                    return (
                      <div
                        key={item.id}
                        className={`group px-4 py-2.5 bg-zinc-900 shadow-shape rounded-xl flex items-center gap-3 ${
                          isDoneOrLate ? "opacity-60" : ""
                        }`}>
                        {item.isDone ? (
                          <CircleCheck
                            className="size-5 text-lime-300 cursor-pointer"
                            onClick={() =>
                              toggleActvtDone(item.id, item.isDone)
                            }
                          />
                        ) : (
                          <CircleDashed
                            className="size-5 text-zinc-400 cursor-pointer"
                            onClick={() =>
                              toggleActvtDone(item.id, item.isDone)
                            }
                          />
                        )}
                        {/* TO DO => circulo pontilhado para atividades nao completadas */}
                        <span className="text-zinc-100">{item.name}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(item.startsAt, "HH'h'mm")}
                        </span>
                        {/* TO DO => botao excluir atividade */}
                        <Trash
                          className="size-5 text-zinc-400 group-hover:text-red-500 transition-all ease-in duration-200 cursor-pointer"
                          onClick={() => excluirAtividade(item.id)}
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-zinc-500 text-sm">
                  Nenhuma atividade cadastrada nessa data
                </p>
              )}
            </div>
          )
        })}

        {isActivityModalOpen && (
          <CreateActivityModal
            setIsActivityModalOpen={setIsActivityModalOpen}
            fetchActivities={fetchActivities}
          />
        )}
      </div>
    </div>
  )
}

export default Activities
