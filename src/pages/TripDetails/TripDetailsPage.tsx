import { Plus } from "lucide-react"
import { useState } from "react"
import Button from "../../components/Button"
import Activities from "./Activities"
import CreateActivityModal from "./CreateActivityModal"
import DestinationAndDateHeader from "./DestinationAndDateHeader"
import Guests from "./Guests"
import ImportantLinks from "./ImportantLinks"

const TripDetailsPage = () => {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)

  return (
    <div className="max-w-6x px-6 py-10 space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={() => setIsActivityModalOpen(true)}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="h-px w-full bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isActivityModalOpen && (
        <CreateActivityModal setIsActivityModalOpen={setIsActivityModalOpen} />
      )}
    </div>
  )
}

export default TripDetailsPage
