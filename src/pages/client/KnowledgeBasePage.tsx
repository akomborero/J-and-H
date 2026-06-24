import { useState } from "react";
import { Search, BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { kbArticles } from "../../mock/data/seed";
import { cn } from "../../lib/utils";

export function KnowledgeBasePage() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = kbArticles.filter(
    (a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.topic.toLowerCase().includes(query.toLowerCase())
  );
  const topics = Array.from(new Set(filtered.map((a) => a.topic)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Knowledge Base</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Answers to common questions about our services.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/50" />
        <Input className="pl-9" placeholder="Search articles..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 p-12 text-center">
          <BookOpen className="h-8 w-8 text-ink-soft/40 dark:text-paper/25" />
          <p className="text-sm text-ink-soft dark:text-paper/50">No articles match your search.</p>
        </Card>
      ) : (
        topics.map((topic) => (
          <div key={topic}>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-soft dark:text-paper/50">{topic}</h2>
            <Card className="divide-y divide-ink/8 dark:divide-white/8">
              {filtered.filter((a) => a.topic === topic).map((a) => (
                <div key={a.id}>
                  <button
                    onClick={() => setOpenId(openId === a.id ? null : a.id)}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left"
                  >
                    <span className="text-sm font-medium text-ink dark:text-paper">{a.title}</span>
                    <ChevronDown className={cn("h-4 w-4 shrink-0 text-ink-soft transition-transform dark:text-paper/50", openId === a.id && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {openId === a.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-ink-soft dark:text-paper/60">{a.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </Card>
          </div>
        ))
      )}
    </div>
  );
}
