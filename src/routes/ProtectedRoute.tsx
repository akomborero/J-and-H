import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

const roleHome: Record<UserRole, string> = {
  client: "/client",
  admin: "/admin",
  super_admin: "/super-admin",
};

export function ProtectedRoute({ children, allow }: { children: React.ReactNode; allow: UserRole[] }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!allow.includes(user.role)) return <Navigate to={roleHome[user.role]} replace />;

  return <>{children}</>;
}
