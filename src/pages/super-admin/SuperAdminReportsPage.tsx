import { FileSpreadsheet, FileText as FileIcon, FileDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const REPORTS = [
  { id: "revenue", title: "Revenue Report", description: "Income breakdown by service, branch, and time period." },
  { id: "service", title: "Service Report", description: "Usage and profitability by service type." },
  { id: "client", title: "Client Report", description: "Client activity, lifetime value, and engagement." },
  { id: "staff", title: "Staff Report", description: "Performance metrics for all team members." },
  { id: "compliance", title: "Compliance Report", description: "Upcoming renewals and expiry tracking." },
];

export function SuperAdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Reports</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Generate and export reports across the business.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {REPORTS.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <CardTitle className="text-base">{r.title}</CardTitle>
              <p className="text-sm text-ink-soft dark:text-paper/55">{r.description}</p>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5"><FileIcon className="h-3.5 w-3.5" /> PDF</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5" /> Excel</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><FileDown className="h-3.5 w-3.5" /> CSV</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
