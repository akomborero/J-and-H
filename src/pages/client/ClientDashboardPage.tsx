import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Clock, Loader2, CheckCircle2, Receipt, ArrowRight, AlertTriangle } from "lucide-react";
import { StatCard } from "../../components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ApplicationStatusBadge } from "../../components/shared/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../context/DataStoreContext";
import { formatCurrency, formatDate, timeAgo } from "../../lib/utils";

export function ClientDashboardPage() {
  const { user } = useAuth();
  const { applications, invoices, notifications, timelineEvents } = useDataStore();

  if (!user) return null;

  const myApps = applications.filter((a) => a.clientId === user.id);
  const pending = myApps.filter((a) => a.status === "submitted").length;
  const inProgress = myApps.filter((a) => ["documents_verified", "under_review", "processing", "awaiting_approval"].includes(a.status)).length;
  const completed = myApps.filter((a) => a.status === "completed").length;
  const myInvoices = invoices.filter((i) => i.clientId === user.id);
  const outstanding = myInvoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);
  const myNotifications = notifications.filter((n) => n.userId === user.id).slice(0, 4);
  const upcomingDeadlines = myApps.filter((a) => a.dueDate).sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
  const recentActivity = timelineEvents
    .filter((t) => myApps.some((a) => a.id === t.applicationId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">
            Welcome back, {user.fullName.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">
            Here's what's happening with your applications today.
          </p>
        </div>
        <Link to="/client/applications/new">
          <Button className="gap-2">
            New application <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Applications" value={String(myApps.length)} icon={FileText} accent="forest" delay={0} />
        <StatCard label="Pending" value={String(pending)} icon={Clock} accent="ochre" delay={0.05} />
        <StatCard label="In Progress" value={String(inProgress)} icon={Loader2} accent="blue" delay={0.1} />
        <StatCard label="Completed" value={String(completed)} icon={CheckCircle2} accent="forest" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Link to="/client/applications" className="text-sm font-medium text-forest hover:underline dark:text-ochre-light">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="py-8 text-center text-sm text-ink-soft dark:text-paper/50">No activity yet.</p>
              ) : (
                recentActivity.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 border-b border-ink/5 pb-4 last:border-0 last:pb-0 dark:border-white/5"
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ochre" />
                    <div className="flex-1">
                      <p className="text-sm text-ink dark:text-paper">{event.description}</p>
                      <p className="text-xs text-ink-soft dark:text-paper/45">{timeAgo(event.createdAt)}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myApps.slice(0, 4).map((app) => (
                <Link
                  key={app.id}
                  to={`/client/applications/${app.id}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-ink/8 p-3 transition-colors hover:bg-ink/3 dark:border-white/8 dark:hover:bg-white/3"
                >
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-paper">{app.serviceName}</p>
                    <p className="text-xs text-ink-soft dark:text-paper/50">{app.refNumber}</p>
                  </div>
                  <ApplicationStatusBadge status={app.status} />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-ochre-dark dark:text-ochre-light" />
                Outstanding Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-2xl font-semibold text-ink dark:text-paper">{formatCurrency(outstanding)}</p>
              <Link to="/client/invoices" className="mt-3 inline-block text-sm font-medium text-forest hover:underline dark:text-ochre-light">
                View invoices &rarr;
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-ochre-dark dark:text-ochre-light" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeadlines.length === 0 ? (
                <p className="text-sm text-ink-soft dark:text-paper/50">No upcoming deadlines.</p>
              ) : (
                upcomingDeadlines.map((app) => (
                  <div key={app.id} className="flex items-center justify-between text-sm">
                    <span className="text-ink dark:text-paper">{app.serviceName}</span>
                    <span className="text-ink-soft dark:text-paper/50">{formatDate(app.dueDate!)}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myNotifications.map((n) => (
                <div key={n.id} className="text-sm">
                  <p className="font-medium text-ink dark:text-paper">{n.title}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">{timeAgo(n.createdAt)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
