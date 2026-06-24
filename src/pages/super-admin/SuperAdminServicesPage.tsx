import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input, Label } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { services as initialServices } from "../../mock/data/services";
import { formatCurrency } from "../../lib/utils";

const categoryLabels = {
  company_registration: "Company Registration",
  tax_services: "Tax Services",
  compliance_services: "Compliance Services",
  business_support: "Business Support",
};

export function SuperAdminServicesPage() {
  const [prices, setPrices] = useState<Record<string, number>>(
    Object.fromEntries(initialServices.map((s) => [s.id, s.price]))
  );
  const [saved, setSaved] = useState<string | null>(null);

  const categories = Array.from(new Set(initialServices.map((s) => s.category)));

  const handleSave = (id: string) => {
    setSaved(id);
    setTimeout(() => setSaved(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Services &amp; Pricing</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Configure pricing for all services offered to clients.</p>
      </div>

      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-soft dark:text-paper/50">{categoryLabels[cat]}</h2>
          <Card className="divide-y divide-ink/8 dark:divide-white/8">
            {initialServices.filter((s) => s.category === cat).map((s) => (
              <div key={s.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-ink dark:text-paper">{s.name}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">~{s.estimatedDays} days turnaround</p>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="sr-only" htmlFor={`price-${s.id}`}>Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft dark:text-paper/50">$</span>
                    <Input
                      id={`price-${s.id}`}
                      type="number"
                      className="w-28 pl-6"
                      value={prices[s.id]}
                      onChange={(e) => setPrices((p) => ({ ...p, [s.id]: Number(e.target.value) }))}
                    />
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleSave(s.id)}>
                    {saved === s.id ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        </div>
      ))}

      <Card>
        <CardHeader><CardTitle>Total Catalogue Value</CardTitle></CardHeader>
        <CardContent>
          <p className="font-display text-2xl font-semibold text-ink dark:text-paper">
            {formatCurrency(Object.values(prices).reduce((s, p) => s + p, 0))}
          </p>
          <p className="text-sm text-ink-soft dark:text-paper/50">Sum across {initialServices.length} active services</p>
        </CardContent>
      </Card>
    </div>
  );
}
