import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Homepage from "@/pages";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import EditProfilePage from "@/pages/users/edit-profile";
import ProfilePage from "@/pages/users/profile";
import AdminDashboardPage from "@/pages/admin/dashboard";
import ManageUserPage from "@/pages/admin/manage-user";
import ReportsPage from "@/pages/admin/reports";
import EditUserPage from "@/pages/admin/edit-user";
import ManageRewardsPage from "@/pages/admin/manage-rewards";
import VerifyWasteDepositPage from "@/pages/admin/verify-waste-deposit";
import EditRewardPage from "@/pages/admin/edit-reward";
import WasteLocationPage from "@/pages/waste/location";
import WasteDepositPage from "@/pages/waste/deposit";
import WasteHistoryPage from "@/pages/waste/history";
import AddRewardPage from "@/pages/admin/add-reward";
import RedeemPointsPage from "@/pages/points/redeem";
import HistoryRedeemPointsPage from "@/pages/points/history-redeem";
import DetailWasteDepositPage from "@/pages/admin/detail-waste-deposit";
import DetailRedeemPoinPage from "@/pages/points/detail-redeem";
import ContactUs from "@/pages/contactUs/contact-us";
import DashboardUser from "@/pages/users/dashboard";
import AboutUsPage from "@/pages/about";
import NotFoundPage from "@/pages/not-found";
import SuspendPage from "@/pages/suspend";
import AddLocationPage from "@/pages/admin/add-location";
import AdminHistoryRedeemPage from "@/pages/admin/history-redeem";
import ProtectedRoute from "./protected-route";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          loader: () => "Home | Eco-Points",
          element: <Homepage />,
        },
        {
          path: "/login",
          loader: () => "Login | Eco-Points",
          element: <LoginPage />,
        },
        {
          path: "/register",
          loader: () => "Register | Eco-Points",
          element: <RegisterPage />,
        },
        {
          path: "/profile",
          loader: () => "Profile | Eco-Points",
          element: <ProfilePage />,
        },
        {
          path: "/profile/edit",
          loader: () => "Edit Profile | Eco-Points",
          element: <EditProfilePage />,
        },
        {
          path: "/dashboard",
          loader: () => "Dashboard | Eco-Points",
          element: <DashboardUser />,
        },
        {
          loader: () => "Admin Reports | Eco-Points",
          path: "/admin/reports",
          element: <ReportsPage />,
        },
        {
          path: "/admin/dashboard",
          loader: () => "Admin Dashboard | Eco-Points",
          element: <AdminDashboardPage />,
        },
        {
          path: "/admin/manage-users",
          loader: () => "Manage Users | Eco-Points",
          element: <ManageUserPage />,
        },
        {
          path: "/admin/edit-user/:id",
          loader: () => "Edit User | Eco-Points",
          element: <EditUserPage />,
        },
        {
          path: "/admin/manage-rewards",
          loader: () => "Manage Rewards | Eco-Points",
          element: <ManageRewardsPage />,
        },
        {
          path: "/admin/verify-waste-deposit",
          loader: () => "Verify Waste Deposit | Eco-Points",
          element: <VerifyWasteDepositPage />,
        },
        {
          path: "/admin/edit-reward/:reward_id",
          loader: () => "Edit Reward | Eco-Points",
          element: <EditRewardPage />,
        },
        {
          path: "/locations",
          loader: () => "Waste Locations | Eco-Points",
          element: <WasteLocationPage />,
        },
        {
          path: "/waste/deposit",
          loader: () => "Waste Deposit | Eco-Points",
          element: <WasteDepositPage />,
        },
        {
          path: "/waste/history",
          loader: () => "Waste History | Eco-Points",
          element: <WasteHistoryPage />,
        },
        {
          path: "/admin/add-reward",
          loader: () => "Add Reward | Eco-Points",
          element: <AddRewardPage />,
        },
        {
          path: "/points/redeem",
          loader: () => "Redeem Points | Eco-Points",
          element: <RedeemPointsPage />,
        },
        {
          path: "/points/history",
          loader: () => "Redeem History | Eco-Points",
          element: <HistoryRedeemPointsPage />,
        },
        {
          path: "/admin/add-location",
          loader: () => "Add Location | Eco-Points",
          element: <AddLocationPage />,
        },
        {
          path: "/admin/history-redeem",
          loader: () => "Admin History Redeem | Eco-Points",
          element: <AdminHistoryRedeemPage />,
        },
        {
          path: "/points/detail-redeem/:reward_id",
          loader: () => "Detail Redeem | Eco-Points",
          element: <DetailRedeemPoinPage />,
        },
        {
          path: "/admin/deposit/:deposit_id",
          loader: () => "Detail Waste Deposit | Eco-Points",
          element: <DetailWasteDepositPage />,
        },
        {
          path: "/contact-us",
          loader: () => "Contact Us | Eco-Points",
          element: <ContactUs />,
        },
        {
          path: "/about",
          loader: () => "About Us | Eco-Points",
          element: <AboutUsPage />,
        },
        {
          path: "/suspend",
          loader: () => "Account Suspended | Eco-Points",
          element: <SuspendPage />,
        },
        {
          path: "*",
          loader: () => "Not Found | Eco-Points",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
