import { Calendar, MapPin, Settings2 } from "lucide-react"
import Button from "../../components/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Trip } from "../../validation/types"
import { formatTripDate } from "../../utils/functions"
import { tripController } from "../../controllers/TripsController"

const DestinationAndDateHeader = () => {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  useEffect(() => {
    if (!tripId) return
    const fetchTrip = async () => {
      const trip = await tripController.getTrip(tripId)
      setTrip(trip)
    }
    fetchTrip()
  }, [tripId])

  const formattedDate = formatTripDate(trip?.starts_at, trip?.ends_at)

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
