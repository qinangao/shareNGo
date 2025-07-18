import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Applayout from "./Applayout";
import User from "./pages/User";
import UserPlaces from "./pages/UserPlaces";
import NewPlace from "./components/places/NewPlace";
import UpdatePlace from "./pages/UpdatePlace";
import Auth from "./pages/Auth";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { AuthContextProvider } from "./hooks/AuthContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      // Optional: redirect based on login state
      { index: true, element: <User /> },

      // Public pages
      {
        path: "/auth",
        element: (
          <PublicRoute>
            <Auth />
          </PublicRoute>
        ),
      },
      {
        path: "/:userId/places",
        element: <UserPlaces />,
      },
      {
        path: "/user",
        element: <User />,
      },

      // Protected pages
      {
        path: "/places/new",
        element: (
          <ProtectedRoute>
            <NewPlace />
          </ProtectedRoute>
        ),
      },
      {
        path: "/places/:placeId",
        element: (
          <ProtectedRoute>
            <UpdatePlace />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
