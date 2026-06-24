import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { staffMembers } from "../../mock/data/seed";
import { formatCurrency } from "../../lib/utils";

export function SuperAdminStaffPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Staff Performance</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Track applications processed, completion speed, and revenue by staff member.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {staffMembers.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <CardTitle className="text-base">{s.fullName}</CardTitle>
              <p className="text-xs text-ink-soft dark:text-paper/50">{s.branch} branch</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-ink-soft dark:text-paper/45">Applications</p>
                  <p className="font-display text-lg font-semibold text-ink dark:text-paper">{s.applicationsProcessed}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-soft dark:text-paper/45">Tasks Done</p>
                  <p className="font-display text-lg font-semibold text-ink dark:text-paper">{s.tasksCompleted}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-soft dark:text-paper/45">Avg. Completion</p>
                  <p className="font-display text-lg font-semibold text-ink dark:text-paper">{s.avgCompletionDays}d</p>
                </div>
                <div>
                  <p className="text-xs text-ink-soft dark:text-paper/45">Pending</p>
                  <p className="font-display text-lg font-semibold text-ink dark:text-paper">{s.pendingTasks}</p>
                </div>
              </div>
              <div className="border-t border-ink/8 pt-3 dark:border-white/8">
                <p className="text-xs text-ink-soft dark:text-paper/45">Revenue Generated</p>
                <p className="font-display text-xl font-semibold text-forest dark:text-ochre-light">{formatCurrency(s.revenueGenerated)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
