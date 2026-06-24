import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { ApplicationStatusBadge } from "../../components/shared/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../context/DataStoreContext";
import { formatDate } from "../../lib/utils";

export function ClientApplicationsPage() {
  const { user } = useAuth();
  const { applications } = useDataStore();
  const [query, setQuery] = useState("");

  if (!user) return null;

  const myApps = applications
    .filter((a) => a.clientId === user.id)
    .filter((a) => a.serviceName.toLowerCase().includes(query.toLowerCase()) || a.refNumber.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Applications</h1>
          <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Track and manage all your service applications.</p>
        </div>
        <Link to="/client/applications/new">
          <Button className="gap-2"><Plus className="h-4 w-4" /> New application</Button>
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/50" />
        <Input className="pl-9" placeholder="Search by service or reference..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="space-y-3">
        {myApps.length === 0 ? (
          <Card className="p-10 text-center">
            <p className="text-sm text-ink-soft dark:text-paper/50">No applications found.</p>
          </Card>
        ) : (
          myApps.map((app) => (
            <Link key={app.id} to={`/client/applications/${app.id}`}>
              <Card className="flex flex-col gap-3 p-4 transition-shadow hover:shadow-elevated sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink dark:text-paper">{app.serviceName}</p>
                  </div>
                  <p className="text-sm text-ink-soft dark:text-paper/50">
                    {app.refNumber} &middot; {app.branch} &middot; Updated {formatDate(app.updatedAt)}
                  </p>
                </div>
                <ApplicationStatusBadge status={app.status} />
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
