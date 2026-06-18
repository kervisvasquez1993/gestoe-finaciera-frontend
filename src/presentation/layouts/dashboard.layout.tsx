import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../components/dashboard/dashboard-header";
import { DashboardNav } from "../components/dashboard/dashboard-nav";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardNav />
      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
    </div>
  );
};
