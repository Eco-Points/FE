import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "../pages";
import LoginPage from "../pages/auth/login";
import EditProfilePage from "../pages/users/edit-profile";
import ProfilePage from "../pages/users/profile";
import ReportsPage from "../pages/admin/reports";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: () => "Home | ECO-POINTS",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/profile/edit",
      element: <EditProfilePage />,
    },
    {
      path: "/admin/reports",
      element: <ReportsPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
