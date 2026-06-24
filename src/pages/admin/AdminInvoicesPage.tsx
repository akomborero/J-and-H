import { useState } from "react";
import { Search } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { InvoiceStatusBadge } from "../../components/shared/StatusBadge";
import { useDataStore } from "../../context/DataStoreContext";
import { formatCurrency, formatDate } from "../../lib/utils";

export function AdminInvoicesPage() {
  const { invoices } = useDataStore();
  const [query, setQuery] = useState("");

  const filtered = invoices
    .filter((i) => i.clientName.toLowerCase().includes(query.toLowerCase()) || i.invoiceNumber.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());

  const totalOutstanding = invoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Invoices</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Track billing across all clients.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:max-w-md">
        <Card className="p-4">
          <p className="text-xs text-ink-soft dark:text-paper/50">Total Paid</p>
          <p className="mt-1 font-display text-xl font-semibold text-forest dark:text-ochre-light">{formatCurrency(totalPaid)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-ink-soft dark:text-paper/50">Outstanding</p>
          <p className="mt-1 font-display text-xl font-semibold text-status-danger">{formatCurrency(totalOutstanding)}</p>
        </Card>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/50" />
        <Input className="pl-9" placeholder="Search invoices..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <Card className="divide-y divide-ink/8 dark:divide-white/8">
        {filtered.map((inv) => (
          <div key={inv.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-sm font-medium text-ink dark:text-paper">{inv.invoiceNumber}</p>
              <p className="text-xs text-ink-soft dark:text-paper/50">{inv.clientName} &middot; {inv.serviceName} &middot; Due {formatDate(inv.dueDate)}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-display text-sm font-semibold text-ink dark:text-paper">{formatCurrency(inv.amount)}</p>
              <InvoiceStatusBadge status={inv.status} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
