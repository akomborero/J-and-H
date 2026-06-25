import type { UserRole } from "../types";

/** Maps each user role to the default landing route inside their dashboard. */
export const roleHome: Record<UserRole, string> = {
  client: "/client",
  admin: "/admin",
  super_admin: "/super-admin",
};
