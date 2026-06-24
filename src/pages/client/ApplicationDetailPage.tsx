import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ApplicationStatusBadge } from "../../components/shared/StatusBadge";
import { LedgerTimeline } from "../../components/applications/LedgerTimeline";
import { useDataStore } from "../../context/DataStoreContext";
import { formatDate, formatDateTime } from "../../lib/utils";

export function ApplicationDetailPage() {
  const { id } = useParams();
  const { applications, timelineEvents } = useDataStore();
  const app = applications.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="py-16 text-center">
        <p className="text-ink-soft dark:text-paper/55">Application not found.</p>
        <Link to="/client/applications" className="mt-3 inline-block text-sm font-medium text-forest hover:underline dark:text-ochre-light">
          Back to applications
        </Link>
      </div>
    );
  }

  const events = timelineEvents
    .filter((t) => t.applicationId === app.id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <div className="space-y-6">
      <Link to="/client/applications" className="flex w-fit items-center gap-1.5 text-sm text-ink-soft hover:text-ink dark:text-paper/60 dark:hover:text-paper">
        <ArrowLeft className="h-4 w-4" /> Back to applications
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">{app.serviceName}</h1>
          <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">
            {app.refNumber} &middot; {app.branch} branch &middot; Submitted {formatDate(app.createdAt)}
          </p>
        </div>
        <ApplicationStatusBadge status={app.status} />
      </div>

      <Card className="p-6">
        <LedgerTimeline currentStatus={app.status} events={events} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              {Object.entries(app.details).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 text-sm">
                  <dt className="text-ink-soft dark:text-paper/55">{key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</dt>
                  <dd className="text-right font-medium text-ink dark:text-paper">{value}</dd>
                </div>
              ))}
              {app.assignedStaffName && (
                <div className="flex justify-between gap-4 border-t border-ink/8 pt-3 text-sm dark:border-white/8">
                  <dt className="text-ink-soft dark:text-paper/55">Assigned to</dt>
                  <dd className="font-medium text-ink dark:text-paper">{app.assignedStaffName}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {app.documents.length === 0 ? (
              <p className="text-sm text-ink-soft dark:text-paper/50">No documents uploaded yet.</p>
            ) : (
              app.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between gap-3 rounded-lg border border-ink/8 p-3 dark:border-white/8">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 shrink-0 text-ink-soft dark:text-paper/50" />
                    <div>
                      <p className="text-sm font-medium text-ink dark:text-paper">{doc.name}</p>
                      <p className="text-xs text-ink-soft dark:text-paper/45">
                        {doc.kind === "certificate" ? "Certificate" : doc.kind === "generated" ? "Generated" : "Uploaded"} &middot;{" "}
                        {formatDateTime(doc.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="Download">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
