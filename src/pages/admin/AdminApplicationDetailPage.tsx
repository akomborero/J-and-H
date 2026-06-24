import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Input";
import { ApplicationStatusBadge } from "../../components/shared/StatusBadge";
import { LedgerTimeline } from "../../components/applications/LedgerTimeline";
import { useDataStore } from "../../context/DataStoreContext";
import { useAuth } from "../../context/AuthContext";
import { findService } from "../../mock/data/services";
import { formatDate } from "../../lib/utils";
import type { ApplicationStatus, TaskStatus } from "../../types";

const STATUS_OPTIONS: ApplicationStatus[] = [
  "submitted",
  "documents_verified",
  "under_review",
  "processing",
  "awaiting_approval",
  "completed",
  "rejected",
];

export function AdminApplicationDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { applications, timelineEvents, internalTasks, invoices, updateApplicationStatus, updateTaskStatus, generateInvoice } = useDataStore();
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const app = applications.find((a) => a.id === id);

  if (!app || !user) {
    return (
      <div className="py-16 text-center">
        <p className="text-ink-soft dark:text-paper/55">Application not found.</p>
        <Link to="/admin/applications" className="mt-3 inline-block text-sm font-medium text-forest hover:underline dark:text-ochre-light">Back to applications</Link>
      </div>
    );
  }

  const events = timelineEvents.filter((t) => t.applicationId === app.id).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const tasks = internalTasks.filter((t) => t.applicationId === app.id);
  const existingInvoice = invoices.find((i) => i.applicationId === app.id);
  const service = findService(app.serviceId);

  const handleGenerateInvoice = () => {
    if (!service) return;
    generateInvoice({
      clientId: app.clientId,
      clientName: app.clientName,
      applicationId: app.id,
      serviceName: app.serviceName,
      amount: service.price,
      dueInDays: 7,
    });
    setInvoiceGenerated(true);
  };

  return (
    <div className="space-y-6">
      <Link to="/admin/applications" className="flex w-fit items-center gap-1.5 text-sm text-ink-soft hover:text-ink dark:text-paper/60 dark:hover:text-paper">
        <ArrowLeft className="h-4 w-4" /> Back to applications
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">{app.serviceName}</h1>
          <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">{app.refNumber} &middot; {app.clientName} &middot; {app.branch}</p>
        </div>
        <div className="flex items-center gap-3">
          <ApplicationStatusBadge status={app.status} />
          <Select
            className="w-44"
            value={app.status}
            onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus, user.fullName)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </Select>
        </div>
      </div>

      <Card className="p-6">
        <LedgerTimeline currentStatus={app.status} events={events} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Internal Tasks</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-sm text-ink-soft dark:text-paper/50">No tasks created for this application.</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between gap-3 rounded-lg border border-ink/8 p-3 dark:border-white/8">
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-paper">{task.title}</p>
                    {task.assignedStaffName && <p className="text-xs text-ink-soft dark:text-paper/50">{task.assignedStaffName}</p>}
                  </div>
                  <Select
                    className="h-8 w-36 text-xs"
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="blocked">Blocked</option>
                  </Select>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Billing</CardTitle></CardHeader>
          <CardContent>
            {existingInvoice ? (
              <div className="flex items-center justify-between rounded-lg border border-ink/8 p-3 dark:border-white/8">
                <div>
                  <p className="text-sm font-medium text-ink dark:text-paper">{existingInvoice.invoiceNumber}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">Due {formatDate(existingInvoice.dueDate)}</p>
                </div>
              </div>
            ) : invoiceGenerated ? (
              <p className="text-sm text-forest dark:text-ochre-light">Invoice generated successfully.</p>
            ) : (
              <Button onClick={handleGenerateInvoice} className="gap-2">
                <Receipt className="h-4 w-4" /> Generate invoice ({service ? `$${service.price}` : "—"})
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
