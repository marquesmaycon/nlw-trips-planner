import { createBrowserRouter, RouterProvider } from "react-router-dom"
import CreateTripPage from "./pages/CreateTrip/CreateTripPage"
import TripDetailsPage from "./pages/TripDetails/TripDetailsPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App