import { useState } from "react";
import { Copy, Check, Gift, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { formatCurrency } from "../../lib/utils";

export function ReferralsPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const referralLink = `jhconsultancy.co.zw/register?ref=${user.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralsCount = 3;
  const creditsEarned = 45;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Referrals</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Share your code and earn credits for every friend who signs up.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-forest p-6 text-paper">
          <p className="text-sm text-paper/70">Your referral code</p>
          <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ochre-light">{user.referralCode}</p>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/10 p-2.5">
            <span className="flex-1 truncate text-sm text-paper/90">{referralLink}</span>
            <Button size="sm" variant="ochre" onClick={handleCopy} className="gap-1.5">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-forest dark:text-ochre-light" /> Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-semibold text-ink dark:text-paper">{referralsCount}</p>
            <p className="text-sm text-ink-soft dark:text-paper/50">people signed up with your code</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Gift className="h-4 w-4 text-ochre-dark dark:text-ochre-light" /> Credits Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-semibold text-ink dark:text-paper">{formatCurrency(creditsEarned)}</p>
            <p className="text-sm text-ink-soft dark:text-paper/50">applied automatically to your next invoice</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
