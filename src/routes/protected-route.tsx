import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useToken } from "@/utils/contexts/token";

const ProtectedRoute = () => {
  const { token, user } = useToken();
  const { pathname } = useLocation();

  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/profile",
    "/profile/edit",
    "/dashboard",
    "/admin/reports",
    "/admin/dashboard",
    "/admin/manage-users",
    "/admin/edit-user/:id",
    "/admin/manage-rewards",
    "/admin/verify-waste-deposit",
    "/admin/edit-reward/:reward_id",
    "/waste/deposit",
    "/waste/history",
    "/admin/add-reward",
    "/points/redeem",
    "/admin/add-location",
    "/points/detail-redeem/:reward_id",
    "/admin/deposit/:deposit_id",
  ];

  const userProtected = ["/dashboard", "/waste/deposit", "/waste/history", "/points/redeem", "/points/detail-redeem/:reward_id"];

  const adminProtected = [
    "/admin/reports",
    "/admin/dashboard",
    "/admin/manage-users",
    "/admin/edit-user/:id",
    "/admin/manage-rewards",
    "/admin/verify-waste-deposit",
    "/admin/edit-reward/:reward_id",
    "/admin/add-reward",
    "/admin/add-location",
    "/admin/deposit/:deposit_id",
  ];

  const protectedSuspend = [
    "/login",
    "/register",
    "/",
    "/not-found",
    "/about",
    "/contact-us",
    "/location",
    "/profile",
    "/profile/edit",
    "/dashboard",
    "/admin/reports",
    "/admin/dashboard",
    "/admin/manage-users",
    "/admin/edit-user/:id",
    "/admin/manage-rewards",
    "/admin/verify-waste-deposit",
    "/admin/edit-reward/:reward_id",
    "/waste/deposit",
    "/waste/history",
    "/admin/add-reward",
    "/points/redeem",
    "/admin/add-location",
    "/points/detail-redeem/:reward_id",
    "/admin/deposit/:deposit_id",
  ];

  if (authProtected.includes(pathname)) {
    if (token) {
      if (user?.is_admin === true) return <Navigate to="/admin/dashboard" />;
      if (user?.is_admin === false) return <Navigate to="/dashboard" />;
    }
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;
  }

  if (userProtected.includes(pathname)) {
    if (user?.is_admin === true) return <Navigate to="/admin/dashboard" />;
  }

  if (adminProtected.includes(pathname)) {
    if (user?.is_admin === false) return <Navigate to="/dashboard" />;
  }

  if (protectedSuspend.includes(pathname)) {
    if (user?.status === "suspended") return <Navigate to="/suspend" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
