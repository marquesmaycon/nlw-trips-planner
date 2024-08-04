import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"

import { queryClient } from "./lib/tanStackQuery"
import CreateTripPage from "./pages/CreateTrip/CreateTripPage"
import TripDetailsPage from "./pages/TripDetails/TripDetailsPage"
import RegisterPage from "./pages/Register/RegisterPage"
import LoginPage from "./pages/Login/LoginPage"
import ProtectedRoutes from "./components/ProtectedRoutes"
import GuestsRoutes from "./components/GuestsRoutes"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AuthContextProvider } from "./contexts/AuthContext"

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
      {/* <AuthContextProvider> */}
        <RouterProvider router={router} />
        {/* <BrowserRouter>
          <Routes>
            <Route element={<GuestsRoutes />}>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<CreateTripPage />} />
              <Route path="/trips/:tripId" element={<TripDetailsPage />} />
            </Route>
          </Routes>
        </BrowserRouter> */}
      {/* </AuthContextProvider> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
