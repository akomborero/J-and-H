import { Outlet } from "react-router-dom";
import { PublicNav } from "./PublicNav";
import { PublicFooter } from "./PublicFooter";

export function PublicLayout() {
  return (
    <div className="min-h-screen surface">
      <PublicNav />
      <Outlet />
      <PublicFooter />
    </div>
  );
}
