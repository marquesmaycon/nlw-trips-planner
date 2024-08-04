import DestinationAndDateHeader from "./DestinationAndDateHeader"
import ImportantLinks from "./ImportantLinks"
import Activities from "./Activities"
import Guests from "./Guests"
import { Link } from "react-router-dom"
import Button from "../../components/Button"

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
          <div>
            <Link to="/">
              <Button type="button" variant="secondary" size="full">
                Minhas viagens
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TripDetailsPage
