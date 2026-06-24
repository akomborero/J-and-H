import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { services } from "../../mock/data/services";
import { formatCurrency } from "../../lib/utils";

const categoryLabels = {
  company_registration: "Company Registration",
  tax_services: "Tax Services",
  compliance_services: "Compliance Services",
  business_support: "Business Support",
};

export function AdminServicesPage() {
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Services</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">All services offered to clients, grouped by category.</p>
      </div>

      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-soft dark:text-paper/50">{categoryLabels[cat]}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.filter((s) => s.category === cat).map((s) => (
              <Card key={s.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{s.name}</CardTitle>
                    {s.popular && <Badge variant="ochre">Popular</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-ink-soft dark:text-paper/55">{s.description}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-display font-semibold text-forest dark:text-ochre-light">{formatCurrency(s.price)}</span>
                    <span className="text-ink-soft dark:text-paper/45">~{s.estimatedDays} days</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
