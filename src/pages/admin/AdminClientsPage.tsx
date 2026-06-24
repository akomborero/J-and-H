import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { profiles } from "../../mock/data/seed";
import { useDataStore } from "../../context/DataStoreContext";
import { formatDate, initials } from "../../lib/utils";

export function AdminClientsPage() {
  const [query, setQuery] = useState("");
  const { applications } = useDataStore();
  const clients = profiles.filter((p) => p.role === "client");

  const filtered = clients.filter(
    (c) => c.fullName.toLowerCase().includes(query.toLowerCase()) || c.companyName?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Clients</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Manage client profiles and view their activity.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/50" />
        <Input className="pl-9" placeholder="Search clients..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <Card className="divide-y divide-ink/8 dark:divide-white/8">
        {filtered.map((client) => {
          const clientApps = applications.filter((a) => a.clientId === client.id);
          return (
            <Link
              key={client.id}
              to={`/admin/clients/${client.id}`}
              className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-ink/3 dark:hover:bg-white/3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-ochre-light">
                  {initials(client.fullName)}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink dark:text-paper">{client.fullName}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">{client.companyName} &middot; {client.branch}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <Badge variant="forest">{clientApps.length} applications</Badge>
                </div>
                <span className="hidden text-xs text-ink-soft dark:text-paper/40 sm:block">Joined {formatDate(client.createdAt)}</span>
              </div>
            </Link>
          );
        })}
      </Card>
    </div>
  );
}
