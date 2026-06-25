import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { roleHome } from "../lib/roleHome";
import type { UserRole } from "../types";

export function ProtectedRoute({ children, allow }: { children: React.ReactNode; allow: UserRole[] }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!allow.includes(user.role)) return <Navigate to={roleHome[user.role]} replace />;

  return <>{children}</>;
}
