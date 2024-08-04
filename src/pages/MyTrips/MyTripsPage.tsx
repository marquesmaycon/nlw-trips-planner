import { Link } from "react-router-dom"
import Button from "../../components/Button"
import { useGetTrips } from "../../hooks/api/trip"
import { useLogout } from "../../hooks/api/auth"

const MyTripsPage = () => {
  const { data: trips } = useGetTrips()
  const { mutateAsync: logout, isPending } = useLogout()

  return (
    <div className="max-w-6x space-y-8 px-6 py-10">
      <div className="flex align-center justify-between px-4">
        <Link to="/trips/new">
          <Button type="button">Planejar viagem +</Button>
        </Link>
        <Button variant="secondary" type="button" isLoading={isPending} onClick={() => logout()}>
          Logout
        </Button>
      </div>
      <main className="flex gap-16 px-4 flex-wrap">
        {trips?.map((trip) => (
          <div key={trip.id} className="flex-[1_45%] rounded-lg bg-slate-100 shadow-md">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-slate-800">{trip.destination}</h2>
              <p className="text-gray-500">
                {new Date(trip.startsAt).toLocaleDateString()} até {new Date(trip.endsAt).toLocaleDateString()}
              </p>
            </div>
            <div className="-lg rounded-b bg-slate-300 p-4">
              <Link to={`/trips/${trip.id}`}>
                <Button type="button">Ver detalhes</Button>
              </Link>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default MyTripsPage
