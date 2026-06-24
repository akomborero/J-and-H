import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Building2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { ApplicationStatusBadge, InvoiceStatusBadge } from "../../components/shared/StatusBadge";
import { profiles, crmNotes } from "../../mock/data/seed";
import { useDataStore } from "../../context/DataStoreContext";
import { formatCurrency, formatDate, initials } from "../../lib/utils";

export function AdminClientDetailPage() {
  const { id } = useParams();
  const { applications, invoices } = useDataStore();
  const client = profiles.find((p) => p.id === id);

  if (!client) {
    return (
      <div className="py-16 text-center">
        <p className="text-ink-soft dark:text-paper/55">Client not found.</p>
        <Link to="/admin/clients" className="mt-3 inline-block text-sm font-medium text-forest hover:underline dark:text-ochre-light">Back to clients</Link>
      </div>
    );
  }

  const clientApps = applications.filter((a) => a.clientId === client.id);
  const clientInvoices = invoices.filter((i) => i.clientId === client.id);
  const totalRevenue = clientInvoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const notes = crmNotes.filter((n) => n.clientId === client.id);

  return (
    <div className="space-y-6">
      <Link to="/admin/clients" className="flex w-fit items-center gap-1.5 text-sm text-ink-soft hover:text-ink dark:text-paper/60 dark:hover:text-paper">
        <ArrowLeft className="h-4 w-4" /> Back to clients
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-lg font-semibold text-ochre-light">
          {initials(client.fullName)}
        </div>
        <div>
          <h1 className="font-display text-xl font-medium text-ink dark:text-paper">{client.fullName}</h1>
          <p className="text-sm text-ink-soft dark:text-paper/55">{client.companyName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-ink-soft dark:text-paper/60"><Mail className="h-4 w-4" /> {client.email}</div>
            <div className="flex items-center gap-2 text-ink-soft dark:text-paper/60"><Phone className="h-4 w-4" /> {client.phone}</div>
            <div className="flex items-center gap-2 text-ink-soft dark:text-paper/60"><Building2 className="h-4 w-4" /> {client.companyRegNumber}</div>
            <div className="flex items-center gap-2 text-ink-soft dark:text-paper/60"><MapPin className="h-4 w-4" /> {client.address}</div>
            <div className="border-t border-ink/8 pt-3 dark:border-white/8">
              <p className="text-xs text-ink-soft dark:text-paper/45">Revenue Generated</p>
              <p className="font-display text-xl font-semibold text-ink dark:text-paper">{formatCurrency(totalRevenue)}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Applications</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {clientApps.map((a) => (
                <Link key={a.id} to={`/admin/applications/${a.id}`} className="flex items-center justify-between rounded-lg border border-ink/8 p-3 hover:bg-ink/3 dark:border-white/8 dark:hover:bg-white/3">
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-paper">{a.serviceName}</p>
                    <p className="text-xs text-ink-soft dark:text-paper/50">{a.refNumber}</p>
                  </div>
                  <ApplicationStatusBadge status={a.status} />
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Invoices</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {clientInvoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between rounded-lg border border-ink/8 p-3 dark:border-white/8">
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-paper">{inv.invoiceNumber}</p>
                    <p className="text-xs text-ink-soft dark:text-paper/50">{formatCurrency(inv.amount)} &middot; Due {formatDate(inv.dueDate)}</p>
                  </div>
                  <InvoiceStatusBadge status={inv.status} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>CRM Notes</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {notes.length === 0 ? (
                <p className="text-sm text-ink-soft dark:text-paper/50">No notes yet.</p>
              ) : (
                notes.map((n) => (
                  <div key={n.id} className="rounded-lg bg-ink/3 p-3 text-sm dark:bg-white/3">
                    <p className="text-ink dark:text-paper">{n.body}</p>
                    <p className="mt-1 text-xs text-ink-soft dark:text-paper/45">{n.author} &middot; {formatDate(n.createdAt)}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
