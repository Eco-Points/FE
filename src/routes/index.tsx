import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "../pages";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: () => "Home | ECO-POINTS",
      element: <Homepage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
