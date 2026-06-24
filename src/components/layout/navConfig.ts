import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Receipt,
  LifeBuoy,
  BookOpen,
  Users,
  ClipboardList,
  Briefcase,
  BarChart3,
  Settings,
  Building2,
  Gift,
  Boxes,
} from "lucide-react";
import type { UserRole } from "../../types";

export interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
}

export const clientNav: NavItem[] = [
  { label: "Dashboard", to: "/client", icon: LayoutDashboard },
  { label: "Applications", to: "/client/applications", icon: FileText },
  { label: "Documents", to: "/client/documents", icon: FolderOpen },
  { label: "Invoices", to: "/client/invoices", icon: Receipt },
  { label: "Support", to: "/client/support", icon: LifeBuoy },
  { label: "Knowledge Base", to: "/client/knowledge-base", icon: BookOpen },
  { label: "Referrals", to: "/client/referrals", icon: Gift },
];

export const adminNav: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Clients", to: "/admin/clients", icon: Users },
  { label: "Applications", to: "/admin/applications", icon: FileText },
  { label: "Tasks", to: "/admin/tasks", icon: ClipboardList },
  { label: "Invoices", to: "/admin/invoices", icon: Receipt },
  { label: "Support Tickets", to: "/admin/support", icon: LifeBuoy },
  { label: "Services", to: "/admin/services", icon: Briefcase },
];

export const superAdminNav: NavItem[] = [
  { label: "Executive Overview", to: "/super-admin", icon: LayoutDashboard },
  { label: "Staff", to: "/super-admin/staff", icon: Users },
  { label: "Services & Pricing", to: "/super-admin/services", icon: Briefcase },
  { label: "Packages", to: "/super-admin/packages", icon: Boxes },
  { label: "Reports", to: "/super-admin/reports", icon: BarChart3 },
  { label: "Branches", to: "/super-admin/branches", icon: Building2 },
  { label: "Settings", to: "/super-admin/settings", icon: Settings },
];

export function getNavForRole(role: UserRole): NavItem[] {
  if (role === "super_admin") return superAdminNav;
  if (role === "admin") return adminNav;
  return clientNav;
}
