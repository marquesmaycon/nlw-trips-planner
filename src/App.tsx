import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import GuestsRoutes from "./components/GuestsRoutes"
import ProtectedRoutes from "./components/ProtectedRoutes"
import { queryClient } from "./libs/tanStackQuery"
import CreateTripPage from "./pages/CreateTrip/CreateTripPage"
import LoginPage from "./pages/Login/LoginPage"
import RegisterPage from "./pages/Register/RegisterPage"
import TripDetailsPage from "./pages/TripDetails/TripDetailsPage"
import MyTripsPage from "./pages/MyTrips/MyTripsPage"

const router = createBrowserRouter([
  {
    element: <GuestsRoutes />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <MyTripsPage />,
      },
      {
        path: "/trips/new",
        element: <CreateTripPage />,
      },
      {
        path: "/trips/:tripId",
        element: <TripDetailsPage />,
      },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route element={<GuestsRoutes />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MyTripsPage />} />
            <Route path="/create-trip" element={<CreateTripPage />} />
            <Route path="/trips/:tripId" element={<TripDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
