import { QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import CreateTripPage from "./pages/CreateTrip/CreateTripPage"
import TripDetailsPage from "./pages/TripDetails/TripDetailsPage"
import { queryClient } from "./lib/tanStackQuery"

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App