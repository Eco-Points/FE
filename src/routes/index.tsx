import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "../pages";
import EditProfilePage from "../pages/users/edit-profile";
import ProfilePage from "../pages/users/profile";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: () => "Home | ECO-POINTS",
      element: <Homepage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/profile/edit",
      element: <EditProfilePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
