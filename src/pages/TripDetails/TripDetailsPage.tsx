import Activities from "./Activities"
import DestinationAndDateHeader from "./DestinationAndDateHeader"
import Guests from "./Guests"
import ImportantLinks from "./ImportantLinks"

const TripDetailsPage = () => {
  return (
    <div className="max-w-6x px-6 py-10 space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <Activities />

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="h-px w-full bg-zinc-800" />
          <Guests />
        </div>
      </main>
    </div>
  )
}

export default TripDetailsPage
