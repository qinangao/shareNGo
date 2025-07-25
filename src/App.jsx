import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Applayout from "./Applayout";
import User from "./pages/User";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { AuthContextProvider } from "./hooks/AuthContextProvider";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/Spinner";
import Home from "./pages/Home";

const Auth = lazy(() => import("./pages/Auth"));
const UserPlaces = lazy(() => import("./pages/UserPlaces"));
const NewPlace = lazy(() => import("./components/places/NewPlace"));
const UpdatePlace = lazy(() => import("./pages/UpdatePlace"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      { index: true, element: <Home /> },

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
      <Suspense fallback={<Spinner size="large" />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthContextProvider>
  );
}

export default App;
