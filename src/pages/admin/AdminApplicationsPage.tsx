import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Input, Select } from "../../components/ui/Input";
import { ApplicationStatusBadge } from "../../components/shared/StatusBadge";
import { useDataStore } from "../../context/DataStoreContext";
import { formatDate } from "../../lib/utils";
import type { ApplicationStatus } from "../../types";

export function AdminApplicationsPage() {
  const { applications } = useDataStore();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");

  const filtered = applications
    .filter((a) => statusFilter === "all" || a.status === statusFilter)
    .filter((a) => a.clientName.toLowerCase().includes(query.toLowerCase()) || a.refNumber.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Applications</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Manage and process all client applications.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/50" />
          <Input className="pl-9" placeholder="Search by client or reference..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select className="sm:w-56" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "all")}>
          <option value="all">All statuses</option>
          <option value="submitted">Submitted</option>
          <option value="documents_verified">Documents Verified</option>
          <option value="under_review">Under Review</option>
          <option value="processing">Processing</option>
          <option value="awaiting_approval">Awaiting Approval</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </Select>
      </div>

      <Card className="divide-y divide-ink/8 dark:divide-white/8">
        {filtered.length === 0 ? (
          <p className="p-10 text-center text-sm text-ink-soft dark:text-paper/50">No applications match your filters.</p>
        ) : (
          filtered.map((app) => (
            <Link key={app.id} to={`/admin/applications/${app.id}`} className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-ink/3 dark:hover:bg-white/3">
              <div>
                <p className="text-sm font-medium text-ink dark:text-paper">{app.serviceName}</p>
                <p className="text-xs text-ink-soft dark:text-paper/50">{app.refNumber} &middot; {app.clientName} &middot; {app.branch} &middot; Updated {formatDate(app.updatedAt)}</p>
              </div>
              <ApplicationStatusBadge status={app.status} />
            </Link>
          ))
        )}
      </Card>
    </div>
  );
}
