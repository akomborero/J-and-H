import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, LifeBuoy } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Label, Textarea, Select } from "../../components/ui/Input";
import { TicketStatusBadge } from "../../components/shared/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../context/DataStoreContext";
import { timeAgo } from "../../lib/utils";

export function ClientSupportPage() {
  const { user } = useAuth();
  const { supportTickets, createTicket } = useDataStore();
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("medium");
  const [body, setBody] = useState("");

  if (!user) return null;

  const myTickets = supportTickets
    .filter((t) => t.clientId === user.id)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTicket({ clientId: user.id, clientName: user.fullName, subject, priority, body });
    setSubject("");
    setBody("");
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Support</h1>
          <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Raise a ticket and track our response.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)} className="gap-2">
          <Plus className="h-4 w-4" /> New ticket
        </Button>
      </div>

      {showForm && (
        <Card className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as typeof priority)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="body">Message</Label>
              <Textarea id="body" required value={body} onChange={(e) => setBody(e.target.value)} placeholder="Describe your issue or question..." />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Submit ticket</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      {myTickets.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 p-12 text-center">
          <LifeBuoy className="h-8 w-8 text-ink-soft/40 dark:text-paper/25" />
          <p className="text-sm text-ink-soft dark:text-paper/50">No support tickets yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {myTickets.map((t) => (
            <Link key={t.id} to={`/client/support/${t.id}`}>
              <Card className="flex items-center justify-between gap-4 p-4 transition-shadow hover:shadow-elevated">
                <div>
                  <p className="font-medium text-ink dark:text-paper">{t.subject}</p>
                  <p className="text-sm text-ink-soft dark:text-paper/50">
                    {t.ticketNumber} &middot; Updated {timeAgo(t.updatedAt)}
                  </p>
                </div>
                <TicketStatusBadge status={t.status} />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
