import { useState } from "react"
import { useParams } from "react-router-dom"
import { Calendar, MapPin, Settings2 } from "lucide-react"

import Button from "../../components/Button"
import { useGetTrip } from "../../hooks/queryAndMutations"
import { formatTripDate } from "../../utils/functions"
import DestinationAndDateModal from "./modals/DestinationAndDateModal"

const DestinationAndDateHeader = () => {
  const { tripId } = useParams()
  const [setIsDestinationDateModalOpen, setSetIsDestinationDateModalOpen] = useState(false)

  const { data: trip } = useGetTrip(tripId!)

  const formattedDate = formatTripDate(trip?.startsAt, trip?.endsAt)

  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{formattedDate}</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />
        <Button variant="secondary" onClick={() => setSetIsDestinationDateModalOpen(true)}>
          Alterar local e data <Settings2 className="size-5" />
        </Button>
      </div>

      {setIsDestinationDateModalOpen && <DestinationAndDateModal setIsDestinationDateModalOpen={setSetIsDestinationDateModalOpen} />}
    </div>
  )
}

export default DestinationAndDateHeader
