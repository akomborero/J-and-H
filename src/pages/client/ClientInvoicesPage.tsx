import { useState } from "react";
import { Upload, FileCheck, Receipt } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { InvoiceStatusBadge } from "../../components/shared/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../context/DataStoreContext";
import { formatCurrency, formatDate } from "../../lib/utils";

export function ClientInvoicesPage() {
  const { user } = useAuth();
  const { invoices } = useDataStore();
  const [uploadedFor, setUploadedFor] = useState<Record<string, boolean>>({});

  if (!user) return null;

  const myInvoices = invoices
    .filter((i) => i.clientId === user.id)
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Invoices</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">View and pay invoices for your services.</p>
      </div>

      {myInvoices.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 p-12 text-center">
          <Receipt className="h-8 w-8 text-ink-soft/40 dark:text-paper/25" />
          <p className="text-sm text-ink-soft dark:text-paper/50">No invoices yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {myInvoices.map((inv) => {
            const hasUploaded = uploadedFor[inv.id] || !!inv.proofOfPaymentUrl;
            return (
              <Card key={inv.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-ink dark:text-paper">{inv.invoiceNumber}</p>
                  <p className="text-sm text-ink-soft dark:text-paper/50">
                    {inv.serviceName} &middot; Due {formatDate(inv.dueDate)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-display text-lg font-semibold text-ink dark:text-paper">{formatCurrency(inv.amount)}</p>
                  <InvoiceStatusBadge status={inv.status} />
                  {(inv.status === "sent" || inv.status === "overdue") && (
                    hasUploaded ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-forest dark:text-ochre-light">
                        <FileCheck className="h-3.5 w-3.5" /> Proof submitted
                      </span>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => setUploadedFor((p) => ({ ...p, [inv.id]: true }))}
                      >
                        <Upload className="h-3.5 w-3.5" /> Upload proof of payment
                      </Button>
                    )
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
