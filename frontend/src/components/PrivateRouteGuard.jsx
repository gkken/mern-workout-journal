import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMemo } from "react";

export default function PrivateRouteGuard() {
  const { user } = useAuthContext();
  let isLoggedIn;

  if (user) {
    isLoggedIn = useMemo(() => {
      return user.token;
    });
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} replace />;
}
