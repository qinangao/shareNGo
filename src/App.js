import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Applayout from "./Applayout";
import User from "./pages/User";

import Places from "./pages/Places";
import UserPlaces from "./pages/UserPlaces";
import NewPlace from "./components/places/NewPlace";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      // { index: true, element: <Home /> },
      { path: "/user", element: <User /> },
      { path: "/:userId/places", element: <UserPlaces /> },
      { path: "/places", element: <Places /> },
      { path: "/places/new", element: <NewPlace /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
