import { useState } from "react";
import { Mail, MessageCircle, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { cn } from "../../lib/utils";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        checked ? "bg-forest" : "bg-ink/15 dark:bg-white/15"
      )}
    >
      <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", checked ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}

export function SuperAdminSettingsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">System Settings</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Configure notification channels and platform behaviour.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Notification Channels</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-ink-soft dark:text-paper/50" />
              <div>
                <p className="text-sm font-medium text-ink dark:text-paper">Email Notifications</p>
                <p className="text-xs text-ink-soft dark:text-paper/50">Application updates, invoices, completion alerts</p>
              </div>
            </div>
            <Toggle checked={emailEnabled} onChange={() => setEmailEnabled((v) => !v)} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-ink-soft dark:text-paper/50" />
              <div>
                <p className="text-sm font-medium text-ink dark:text-paper">WhatsApp Notifications</p>
                <p className="text-xs text-ink-soft dark:text-paper/50">Status updates and completion alerts via WhatsApp Business API</p>
              </div>
            </div>
            <Toggle checked={whatsappEnabled} onChange={() => setWhatsappEnabled((v) => !v)} />
          </div>
          <div className="flex items-center justify-between opacity-60">
            <div className="flex items-center gap-3">
              <Smartphone className="h-4 w-4 text-ink-soft dark:text-paper/50" />
              <div>
                <p className="text-sm font-medium text-ink dark:text-paper">SMS Notifications</p>
                <p className="text-xs text-ink-soft dark:text-paper/50">Coming soon — reserved for future implementation</p>
              </div>
            </div>
            <Toggle checked={smsEnabled} onChange={() => setSmsEnabled((v) => !v)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Payment Methods</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-ink/8 p-3 dark:border-white/8">
            <span className="text-ink dark:text-paper">Manual Payment Verification</span>
            <span className="text-xs font-medium text-forest dark:text-ochre-light">Active</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink/8 p-3 opacity-60 dark:border-white/8">
            <span className="text-ink dark:text-paper">EcoCash, Innbucks, Mukuru, Paynow</span>
            <span className="text-xs font-medium text-ink-soft dark:text-paper/50">Phase 2</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
