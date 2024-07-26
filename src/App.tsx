import { createBrowserRouter, RouterProvider } from "react-router-dom"
import CreateTripPage from "./pages/CreateTrip/CreateTripPage"
import TripDetailsPage from "./pages/TripDetails/TripDetailsPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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

export const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App