import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { servicePackages, findService } from "../../mock/data/services";
import { formatCurrency } from "../../lib/utils";

export function SuperAdminPackagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Service Packages</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Bundled offerings combining multiple services at a discount.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {servicePackages.map((pkg) => {
          const includedServices = pkg.serviceIds.map((id) => findService(id)).filter(Boolean);
          const fullPrice = includedServices.reduce((s, svc) => s + (svc?.price ?? 0), 0);
          return (
            <Card key={pkg.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{pkg.name}</CardTitle>
                  <Badge variant="ochre">{pkg.discountPercent}% off</Badge>
                </div>
                <p className="text-sm text-ink-soft dark:text-paper/55">{pkg.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-sm">
                  {includedServices.map((svc) => (
                    <li key={svc!.id} className="flex items-center justify-between text-ink dark:text-paper">
                      <span>{svc!.name}</span>
                      <span className="text-ink-soft dark:text-paper/50">{formatCurrency(svc!.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3 dark:border-white/8">
                  <div>
                    <p className="text-xs text-ink-soft line-through dark:text-paper/40">{formatCurrency(fullPrice)}</p>
                    <p className="font-display text-xl font-semibold text-forest dark:text-ochre-light">{formatCurrency(pkg.price)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
