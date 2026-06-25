import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { DollarSign, TrendingUp, FileText, Users } from "lucide-react";
import { StatCard } from "../../components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { useDataStore } from "../../context/DataStoreContext";
import { staffMembers, profiles } from "../../mock/data/seed";
import { services } from "../../mock/data/services";
import { formatCurrency } from "../../lib/utils";

const revenueTrend = [
  { day: "Mon", revenue: 320 },
  { day: "Tue", revenue: 410 },
  { day: "Wed", revenue: 280 },
  { day: "Thu", revenue: 560 },
  { day: "Fri", revenue: 690 },
  { day: "Sat", revenue: 240 },
  { day: "Sun", revenue: 180 },
];

export function SuperAdminDashboardPage() {
  const { invoices, applications } = useDataStore();

  const totalRevenue = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const revenueToday = 0;
  const completed = applications.filter((a) => a.status === "completed").length;
  const clientCount = profiles.filter((p) => p.role === "client").length;

  const serviceUsage = services
    .map((s) => ({
      name: s.name.split(" ").slice(0, 2).join(" "),
      count: applications.filter((a) => a.serviceId === s.id).length,
    }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const topStaff = [...staffMembers].sort((a, b) => b.revenueGenerated - a.revenueGenerated);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Executive Overview</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Revenue, applications, and performance across the business.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue Today" value={formatCurrency(revenueToday)} icon={DollarSign} accent="ochre" delay={0} />
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon={TrendingUp} accent="forest" delay={0.05} />
        <StatCard label="Completed Applications" value={String(completed)} icon={FileText} accent="blue" delay={0.1} />
        <StatCard label="Active Clients" value={String(clientCount)} icon={Users} accent="forest" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Revenue This Week</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend} margin={{ left: -20 }}>
                  <defs>
                    <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9974A" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#C9974A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink/5" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value?: number | string | readonly (number | string)[]) => [formatCurrency(Number(Array.isArray(value) ? value[0] : value ?? 0)), "Revenue"]}
                    contentStyle={{ borderRadius: 8, border: "1px solid rgba(21,23,20,0.1)", fontSize: 13 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#0F2A52" strokeWidth={2} fill="url(#revGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Best Performing Staff</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topStaff.map((s, i) => (
              <div key={s.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ochre/20 text-[11px] font-semibold text-ochre-dark dark:text-ochre-light">{i + 1}</span>
                  <span className="text-ink dark:text-paper">{s.fullName}</span>
                </div>
                <span className="font-medium text-forest dark:text-ochre-light">{formatCurrency(s.revenueGenerated)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Most Popular Services</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceUsage} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink/5" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid rgba(21,23,20,0.1)", fontSize: 13 }} />
                <Bar dataKey="count" fill="#0F2A52" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
