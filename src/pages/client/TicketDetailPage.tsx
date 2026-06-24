import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Input";
import { TicketStatusBadge } from "../../components/shared/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../context/DataStoreContext";
import { cn, formatDateTime, initials } from "../../lib/utils";

export function TicketDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { supportTickets, addTicketMessage } = useDataStore();
  const [reply, setReply] = useState("");

  const ticket = supportTickets.find((t) => t.id === id);

  if (!ticket || !user) {
    return (
      <div className="py-16 text-center">
        <p className="text-ink-soft dark:text-paper/55">Ticket not found.</p>
        <Link to="/client/support" className="mt-3 inline-block text-sm font-medium text-forest hover:underline dark:text-ochre-light">
          Back to support
        </Link>
      </div>
    );
  }

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    addTicketMessage(ticket.id, { author: user.fullName, authorRole: user.role, body: reply });
    setReply("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/client/support" className="flex w-fit items-center gap-1.5 text-sm text-ink-soft hover:text-ink dark:text-paper/60 dark:hover:text-paper">
        <ArrowLeft className="h-4 w-4" /> Back to support
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-medium text-ink dark:text-paper">{ticket.subject}</h1>
          <p className="mt-0.5 text-sm text-ink-soft dark:text-paper/50">{ticket.ticketNumber}</p>
        </div>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <Card className="space-y-4 p-5">
        {ticket.messages.map((m) => (
          <div key={m.id} className={cn("flex gap-3", m.authorRole !== "client" && "flex-row-reverse")}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-semibold text-ochre-light">
              {initials(m.author)}
            </div>
            <div className={cn("max-w-[80%] rounded-xl px-3.5 py-2.5", m.authorRole !== "client" ? "bg-forest/10 dark:bg-forest-light/15" : "bg-ink/5 dark:bg-white/5")}>
              <p className="text-sm text-ink dark:text-paper">{m.body}</p>
              <p className="mt-1 text-[11px] text-ink-soft/70 dark:text-paper/40">{m.author} &middot; {formatDateTime(m.createdAt)}</p>
            </div>
          </div>
        ))}
      </Card>

      <form onSubmit={handleReply} className="flex items-end gap-2">
        <Textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type a reply..." className="min-h-[44px]" />
        <Button type="button" variant="outline" size="icon" aria-label="Attach file">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button type="submit" size="icon" aria-label="Send">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
