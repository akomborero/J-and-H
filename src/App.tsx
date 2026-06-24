import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { DataStoreProvider } from "./context/DataStoreContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { DashboardLayout } from "./components/layout/DashboardLayout";

import { LandingPage } from "./pages/public/LandingPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";

import { ClientDashboardPage } from "./pages/client/ClientDashboardPage";
import { ClientApplicationsPage } from "./pages/client/ClientApplicationsPage";
import { NewApplicationPage } from "./pages/client/NewApplicationPage";
import { ApplicationDetailPage } from "./pages/client/ApplicationDetailPage";
import { ClientDocumentsPage } from "./pages/client/ClientDocumentsPage";
import { ClientInvoicesPage } from "./pages/client/ClientInvoicesPage";
import { ClientSupportPage } from "./pages/client/ClientSupportPage";
import { TicketDetailPage } from "./pages/client/TicketDetailPage";
import { KnowledgeBasePage } from "./pages/client/KnowledgeBasePage";
import { ReferralsPage } from "./pages/client/ReferralsPage";

import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminClientsPage } from "./pages/admin/AdminClientsPage";
import { AdminClientDetailPage } from "./pages/admin/AdminClientDetailPage";
import { AdminApplicationsPage } from "./pages/admin/AdminApplicationsPage";
import { AdminApplicationDetailPage } from "./pages/admin/AdminApplicationDetailPage";
import { AdminTasksPage } from "./pages/admin/AdminTasksPage";
import { AdminInvoicesPage } from "./pages/admin/AdminInvoicesPage";
import { AdminSupportPage } from "./pages/admin/AdminSupportPage";
import { AdminServicesPage } from "./pages/admin/AdminServicesPage";

import { SuperAdminDashboardPage } from "./pages/super-admin/SuperAdminDashboardPage";
import { SuperAdminStaffPage } from "./pages/super-admin/SuperAdminStaffPage";
import { SuperAdminServicesPage } from "./pages/super-admin/SuperAdminServicesPage";
import { SuperAdminPackagesPage } from "./pages/super-admin/SuperAdminPackagesPage";
import { SuperAdminReportsPage } from "./pages/super-admin/SuperAdminReportsPage";
import { SuperAdminBranchesPage } from "./pages/super-admin/SuperAdminBranchesPage";
import { SuperAdminSettingsPage } from "./pages/super-admin/SuperAdminSettingsPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataStoreProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/client"
                element={
                  <ProtectedRoute allow={["client"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ClientDashboardPage />} />
                <Route path="applications" element={<ClientApplicationsPage />} />
                <Route path="applications/new" element={<NewApplicationPage />} />
                <Route path="applications/:id" element={<ApplicationDetailPage />} />
                <Route path="documents" element={<ClientDocumentsPage />} />
                <Route path="invoices" element={<ClientInvoicesPage />} />
                <Route path="support" element={<ClientSupportPage />} />
                <Route path="support/:id" element={<TicketDetailPage />} />
                <Route path="knowledge-base" element={<KnowledgeBasePage />} />
                <Route path="referrals" element={<ReferralsPage />} />
              </Route>

              <Route
                path="/admin"
                element={
                  <ProtectedRoute allow={["admin", "super_admin"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="clients" element={<AdminClientsPage />} />
                <Route path="clients/:id" element={<AdminClientDetailPage />} />
                <Route path="applications" element={<AdminApplicationsPage />} />
                <Route path="applications/:id" element={<AdminApplicationDetailPage />} />
                <Route path="tasks" element={<AdminTasksPage />} />
                <Route path="invoices" element={<AdminInvoicesPage />} />
                <Route path="support" element={<AdminSupportPage />} />
                <Route path="services" element={<AdminServicesPage />} />
              </Route>

              <Route
                path="/super-admin"
                element={
                  <ProtectedRoute allow={["super_admin"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<SuperAdminDashboardPage />} />
                <Route path="staff" element={<SuperAdminStaffPage />} />
                <Route path="services" element={<SuperAdminServicesPage />} />
                <Route path="packages" element={<SuperAdminPackagesPage />} />
                <Route path="reports" element={<SuperAdminReportsPage />} />
                <Route path="branches" element={<SuperAdminBranchesPage />} />
                <Route path="settings" element={<SuperAdminSettingsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DataStoreProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
