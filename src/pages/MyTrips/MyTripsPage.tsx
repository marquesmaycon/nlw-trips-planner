import { Link } from "react-router-dom"
import Button from "../../components/Button"
import { useDeleteTrip, useGetTrips } from "../../hooks/api/trip"
import { useLogout } from "../../hooks/api/auth"
import { Trash } from "lucide-react"

const MyTripsPage = () => {
  const { data: trips } = useGetTrips()
  const { mutateAsync: logout, isPending } = useLogout()

  const { mutateAsync: deleteTrip, variables } = useDeleteTrip()

  return (
    <div className="max-w-6x space-y-8 px-6 py-10 h-lvh">
      <div className="align-center flex justify-between px-4">
        <Link to="/trips/new">
          <Button type="button">Planejar viagem +</Button>
        </Link>
        <Button variant="secondary" type="button" isLoading={isPending} onClick={() => logout()}>
          Logout
        </Button>
      </div>
      <main className="flex flex-wrap gap-16 px-4">
        {trips?.map((trip) => (
          <div key={trip.id} className={`flex-[1_45%] rounded-lg bg-slate-100 shadow-md ${variables == trip.id ? "animate-pulse" : ""}`}>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-slate-800">{trip.destination}</h2>
              <p className="text-gray-500">
                {new Date(trip.startsAt).toLocaleDateString()} até {new Date(trip.endsAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center justify-between rounded-b bg-slate-300 p-4">
              <Link to={`/trips/${trip.id}`}>
                <Button type="button">Ver detalhes</Button>
              </Link>
              <button type="button" onClick={() => deleteTrip(trip.id)}>
                <Trash className="size-5 text-slate-800 transition-all duration-200 ease-in hover:text-red-600" />
              </button>
            </div>
          </div>
        ))}

        {!trips?.length && <p className="text-center text-slate-500 w-full">Nenhuma viagem planejada</p>}
      </main>
    </div>
  )
}

export default MyTripsPage
