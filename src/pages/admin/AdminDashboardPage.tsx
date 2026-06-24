import { Link } from "react-router-dom";
import { FileText, Clock, AlertCircle, Receipt, Users, ClipboardList } from "lucide-react";
import { StatCard } from "../../components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { ApplicationStatusBadge } from "../../components/shared/StatusBadge";
import { useDataStore } from "../../context/DataStoreContext";
import { profiles, complianceRecords } from "../../mock/data/seed";
import { formatDate } from "../../lib/utils";

export function AdminDashboardPage() {
  const { applications, invoices, supportTickets, internalTasks } = useDataStore();

  const pending = applications.filter((a) => a.status === "submitted").length;
  const inProgress = applications.filter((a) => ["documents_verified", "under_review", "processing", "awaiting_approval"].includes(a.status)).length;
  const overdueInvoices = invoices.filter((i) => i.status === "overdue").length;
  const openTickets = supportTickets.filter((t) => t.status === "open" || t.status === "in_progress").length;
  const clientCount = profiles.filter((p) => p.role === "client").length;
  const pendingTasks = internalTasks.filter((t) => t.status === "pending" || t.status === "in_progress").length;

  const recentApps = [...applications].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 6);
  const expiringCompliance = complianceRecords.filter((c) => c.status === "expiring_soon" || c.status === "expired");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Operational overview across all branches.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Clients" value={String(clientCount)} icon={Users} accent="forest" delay={0} />
        <StatCard label="Pending" value={String(pending)} icon={Clock} accent="ochre" delay={0.04} />
        <StatCard label="In Progress" value={String(inProgress)} icon={FileText} accent="blue" delay={0.08} />
        <StatCard label="Pending Tasks" value={String(pendingTasks)} icon={ClipboardList} accent="blue" delay={0.12} />
        <StatCard label="Overdue Invoices" value={String(overdueInvoices)} icon={Receipt} accent="danger" delay={0.16} />
        <StatCard label="Open Tickets" value={String(openTickets)} icon={AlertCircle} accent="danger" delay={0.2} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent Applications</CardTitle>
            <Link to="/admin/applications" className="text-sm font-medium text-forest hover:underline dark:text-ochre-light">View all</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentApps.map((app) => (
              <Link
                key={app.id}
                to={`/admin/applications/${app.id}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-ink/8 p-3 transition-colors hover:bg-ink/3 dark:border-white/8 dark:hover:bg-white/3"
              >
                <div>
                  <p className="text-sm font-medium text-ink dark:text-paper">{app.serviceName}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">{app.refNumber} &middot; {app.clientName}</p>
                </div>
                <ApplicationStatusBadge status={app.status} />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {expiringCompliance.map((c) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-ink dark:text-paper">{c.clientName}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">{c.type.replace(/_/g, " ")}</p>
                </div>
                <span className={c.status === "expired" ? "text-status-danger" : "text-ochre-dark dark:text-ochre-light"}>
                  {formatDate(c.expiryDate)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
