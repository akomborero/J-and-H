import { useState } from "react";
import { Search, FileText, Download, FolderOpen } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../context/DataStoreContext";
import { formatDateTime } from "../../lib/utils";

const kindLabel = {
  uploaded: "Uploaded",
  generated: "Generated",
  certificate: "Certificate",
} as const;

export function ClientDocumentsPage() {
  const { user } = useAuth();
  const { applications } = useDataStore();
  const [query, setQuery] = useState("");

  if (!user) return null;

  const myApps = applications.filter((a) => a.clientId === user.id);
  const allDocs = myApps.flatMap((a) =>
    a.documents.map((doc) => ({ ...doc, applicationRef: a.refNumber, serviceName: a.serviceName }))
  );
  const filtered = allDocs
    .filter((d) => d.name.toLowerCase().includes(query.toLowerCase()) || d.serviceName.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Documents</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">
          Your permanent digital cabinet — every document, certificate, and record in one place.
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/50" />
        <Input className="pl-9" placeholder="Search documents..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 p-12 text-center">
          <FolderOpen className="h-8 w-8 text-ink-soft/40 dark:text-paper/25" />
          <p className="text-sm text-ink-soft dark:text-paper/50">No documents found.</p>
        </Card>
      ) : (
        <Card className="divide-y divide-ink/8 dark:divide-white/8">
          {filtered.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink dark:text-paper">{doc.name}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">
                    {doc.serviceName} &middot; {doc.applicationRef} &middot; {formatDateTime(doc.uploadedAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={doc.kind === "certificate" ? "ochre" : "default"} className="hidden sm:inline-flex">
                  {kindLabel[doc.kind]}
                </Badge>
                <Button variant="ghost" size="icon" aria-label="Download">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
