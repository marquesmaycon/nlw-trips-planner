import { Calendar, Tag, X } from "lucide-react"
import Button from "../../components/Button"
import { FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

type CreateActivityModalProps = {
  setIsActivityModalOpen: (value: boolean) => void
}

const CreateActivityModal = ({
  setIsActivityModalOpen,
}: CreateActivityModalProps) => {
  const { tripId } = useParams()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get("title")?.toString()
    const when = data.get("when")?.toString()

    if (!title || !when) {
      return
    }

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: when,
    })

    setIsActivityModalOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button type="button" onClick={() => setIsActivityModalOpen(false)}>
              <X className="text-zinc-400 size-5" />
            </button>
          </div>
          <p className="text-small text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="px-4 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <Tag className="size-5 text-zinc-400" />

            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>

          <div className="px-4 flex-1 h-14 py-2.5 border border-zinc-800 bg-zinc-950 rounded-lg flex gap-2.5 items-center">
            <Calendar className="size-5 text-zinc-400" />

            <input
              type="datetime-local"
              name="when"
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>
          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateActivityModal
