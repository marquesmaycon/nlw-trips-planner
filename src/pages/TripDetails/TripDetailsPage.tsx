import DestinationAndDateHeader from "./DestinationAndDateHeader"
import ImportantLinks from "./ImportantLinks"
import Activities from "./Activities"
import Guests from "./Guests"

const TripDetailsPage = () => {
  return (
    <div className="max-w-6x space-y-8 px-6 py-10">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <Activities />

        <div className="w-80 space-y-6">
          
          <ImportantLinks />
          <div className="h-px w-full bg-zinc-800" />
          <Guests />
          <div className="h-px w-full bg-zinc-800" />
        </div>
      </main>
    </div>
  )
}

export default TripDetailsPage
