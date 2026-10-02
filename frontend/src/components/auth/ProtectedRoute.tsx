import type { ReactNode } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router";

interface IProps {
  redirectPath: string;
  children: ReactNode;
}

function ProtectedRoute({ redirectPath, children }: IProps) {

  const token = Cookies.get("token");
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;

  if (!token || !userData) return <Navigate to={redirectPath} replace state={userData} />

  return children;
}

export default ProtectedRoute;