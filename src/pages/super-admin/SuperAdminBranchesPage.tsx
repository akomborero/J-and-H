import { Building2, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { useDataStore } from "../../context/DataStoreContext";
import { profiles } from "../../mock/data/seed";
import type { Branch } from "../../types";

const BRANCHES: { name: Branch; address: string }[] = [
  { name: "Harare", address: "88 Samora Machel Ave, Harare CBD" },
  { name: "Bulawayo", address: "45 Josiah Tongogara St, Bulawayo" },
  { name: "Mutare", address: "12 Herbert Chitepo St, Mutare" },
];

export function SuperAdminBranchesPage() {
  const { applications } = useDataStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Branches</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Operations across all J&amp;H Consultancy locations.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {BRANCHES.map((branch) => {
          const branchApps = applications.filter((a) => a.branch === branch.name);
          const branchStaff = profiles.filter((p) => p.branch === branch.name && p.role !== "client");
          return (
            <Card key={branch.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-forest dark:text-ochre-light" /> {branch.name}
                </CardTitle>
                <p className="text-xs text-ink-soft dark:text-paper/50">{branch.address}</p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-ink-soft dark:text-paper/60">
                  <FileText className="h-4 w-4" /> {branchApps.length} applications
                </div>
                <div className="flex items-center gap-2 text-ink-soft dark:text-paper/60">
                  <Users className="h-4 w-4" /> {branchStaff.length} staff members
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
