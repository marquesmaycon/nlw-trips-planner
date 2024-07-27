import { Calendar, MapPin, Settings2 } from "lucide-react"
import { useParams } from "react-router-dom"
import Button from "../../components/Button"
import { useGetTrip } from "../../hooks/queryAndMutations"
import { formatTripDate } from "../../utils/functions"

const DestinationAndDateHeader = () => {
  const { tripId } = useParams()

  const { data: trip } = useGetTrip(tripId!)

  const formattedDate = formatTripDate(trip?.startsAt, trip?.endsAt)

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{formattedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />
        <Button variant="secondary">
          Alterar local e data <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  )
}

export default DestinationAndDateHeader
