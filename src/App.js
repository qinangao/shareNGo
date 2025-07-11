import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Applayout from "./Applayout";
import User from "./pages/User";
import Places from "./pages/Places";
import UserPlaces from "./pages/UserPlaces";
import NewPlace from "./components/places/NewPlace";
import UpdatePlace from "./pages/UpdatePlace";
import LoginPage from "./pages/LoginPage";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      // { index: true, element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/user", element: <User /> },
      { path: "/:userId/places", element: <UserPlaces /> },
      { path: "/places", element: <Places /> },
      { path: "/places/new", element: <NewPlace /> },
      { path: "/places/:placeId", element: <UpdatePlace /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
