import { useState } from "react";
import { TicketStatusBadge } from "../../components/shared/StatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../context/DataStoreContext";
import { cn, formatDateTime, initials, timeAgo } from "../../lib/utils";

export function AdminSupportPage() {
  const { user } = useAuth();
  const { supportTickets, addTicketMessage } = useDataStore();
  const [activeId, setActiveId] = useState<string | null>(supportTickets[0]?.id ?? null);
  const [reply, setReply] = useState("");

  const sorted = [...supportTickets].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  const active = sorted.find((t) => t.id === activeId);

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!active || !reply.trim() || !user) return;
    addTicketMessage(active.id, { author: user.fullName, authorRole: user.role, body: reply });
    setReply("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Support Tickets</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Respond to client questions and issues.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="divide-y divide-ink/8 lg:col-span-1 dark:divide-white/8">
          {sorted.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={cn("flex w-full flex-col gap-1 p-4 text-left transition-colors", activeId === t.id ? "bg-ink/5 dark:bg-white/5" : "hover:bg-ink/3 dark:hover:bg-white/3")}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-ink dark:text-paper">{t.subject}</p>
                <TicketStatusBadge status={t.status} />
              </div>
              <p className="text-xs text-ink-soft dark:text-paper/50">{t.clientName} &middot; {timeAgo(t.updatedAt)}</p>
            </button>
          ))}
        </Card>

        <div className="lg:col-span-2">
          {active ? (
            <Card className="flex h-full flex-col p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-ink dark:text-paper">{active.subject}</p>
                  <p className="text-xs text-ink-soft dark:text-paper/50">{active.ticketNumber} &middot; {active.clientName}</p>
                </div>
                <TicketStatusBadge status={active.status} />
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto">
                {active.messages.map((m) => (
                  <div key={m.id} className={cn("flex gap-3", m.authorRole !== "client" && "flex-row-reverse")}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-semibold text-ochre-light">
                      {initials(m.author)}
                    </div>
                    <div className={cn("max-w-[75%] rounded-xl px-3.5 py-2.5", m.authorRole !== "client" ? "bg-forest/10 dark:bg-forest-light/15" : "bg-ink/5 dark:bg-white/5")}>
                      <p className="text-sm text-ink dark:text-paper">{m.body}</p>
                      <p className="mt-1 text-[11px] text-ink-soft/70 dark:text-paper/40">{m.author} &middot; {formatDateTime(m.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleReply} className="mt-4 flex items-end gap-2">
                <Textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Reply to client..." className="min-h-[44px]" />
                <Button type="submit">Send</Button>
              </form>
            </Card>
          ) : (
            <Card className="flex h-full items-center justify-center p-10 text-sm text-ink-soft dark:text-paper/50">Select a ticket</Card>
          )}
        </div>
      </div>
    </div>
  );
}
