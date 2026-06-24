import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Upload, X, FileCheck } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Label, Textarea, Select } from "../../components/ui/Input";
import { services } from "../../mock/data/services";
import type { Service, UploadedDocument } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../context/DataStoreContext";
import { cn, formatCurrency } from "../../lib/utils";

const STEPS = ["Select Service", "Enter Details", "Upload Documents", "Review", "Submit"];

export function NewApplicationPage() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [details, setDetails] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<string | null>(null);

  const { user } = useAuth();
  const { createApplication } = useDataStore();
  const navigate = useNavigate();

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleFakeUpload = (docKey: string, label: string) => {
    setUploadedDocs((prev) => ({ ...prev, [docKey]: `${label.replace(/\s+/g, "_").toLowerCase()}.pdf` }));
  };

  const handleSubmit = () => {
    if (!user || !selectedService) return;
    const documents: UploadedDocument[] = Object.entries(uploadedDocs).map(([, name], i) => ({
      id: `newdoc-${i}`,
      name,
      url: "#",
      uploadedAt: new Date().toISOString(),
      sizeKb: Math.floor(Math.random() * 400) + 80,
      kind: "uploaded",
    }));
    const app = createApplication({
      clientId: user.id,
      clientName: user.fullName,
      serviceId: selectedService.id,
      branch: user.branch,
      details,
      documents,
    });
    setSubmitted(app.id);
    setStep(4);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">New Application</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Complete the steps below to submit your service request.</p>
      </div>

      <div className="flex items-center">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  i < step
                    ? "bg-forest text-ochre-light"
                    : i === step
                    ? "bg-ochre text-ink"
                    : "bg-ink/8 text-ink-soft/50 dark:bg-white/10 dark:text-paper/30"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("hidden text-[11px] font-medium sm:block", i <= step ? "text-ink dark:text-paper" : "text-ink-soft/50 dark:text-paper/30")}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("mx-2 h-[2px] flex-1", i < step ? "bg-forest" : "bg-ink/10 dark:bg-white/10")} />
            )}
          </div>
        ))}
      </div>

      <Card className="overflow-hidden p-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <h2 className="mb-4 font-display text-lg font-medium text-ink dark:text-paper">Which service do you need?</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={cn(
                      "rounded-lg border p-4 text-left transition-all",
                      selectedService?.id === s.id
                        ? "border-ochre bg-ochre/10 dark:bg-ochre/10"
                        : "border-ink/10 hover:border-ink/25 dark:border-white/10 dark:hover:border-white/25"
                    )}
                  >
                    <p className="text-sm font-medium text-ink dark:text-paper">{s.name}</p>
                    <p className="mt-1 text-xs text-ink-soft dark:text-paper/50">{s.description}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-forest dark:text-ochre-light">{formatCurrency(s.price)}</span>
                      <span className="text-ink-soft/70 dark:text-paper/40">~{s.estimatedDays} days</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && selectedService && (
            <motion.div key="step1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <h2 className="mb-4 font-display text-lg font-medium text-ink dark:text-paper">Tell us about your {selectedService.name.toLowerCase()}</h2>
              <div className="space-y-4">
                {selectedService.fields.map((field) => (
                  <div key={field.key}>
                    <Label htmlFor={field.key}>
                      {field.label} {field.required && <span className="text-status-danger">*</span>}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.key}
                        required={field.required}
                        value={details[field.key] ?? ""}
                        onChange={(e) => setDetails({ ...details, [field.key]: e.target.value })}
                      />
                    ) : field.type === "select" ? (
                      <Select
                        id={field.key}
                        value={details[field.key] ?? ""}
                        onChange={(e) => setDetails({ ...details, [field.key]: e.target.value })}
                      >
                        <option value="">Select...</option>
                        {field.options?.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        id={field.key}
                        type={field.type}
                        required={field.required}
                        value={details[field.key] ?? ""}
                        onChange={(e) => setDetails({ ...details, [field.key]: e.target.value })}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && selectedService && (
            <motion.div key="step2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <h2 className="mb-4 font-display text-lg font-medium text-ink dark:text-paper">Upload required documents</h2>
              {selectedService.documents.length === 0 ? (
                <p className="text-sm text-ink-soft dark:text-paper/50">No documents are required for this service.</p>
              ) : (
                <div className="space-y-3">
                  {selectedService.documents.map((doc) => {
                    const uploaded = uploadedDocs[doc.key];
                    return (
                      <div key={doc.key} className="flex items-center justify-between gap-3 rounded-lg border border-ink/10 p-4 dark:border-white/10">
                        <div>
                          <p className="text-sm font-medium text-ink dark:text-paper">
                            {doc.label} {doc.required && <span className="text-status-danger">*</span>}
                          </p>
                          {uploaded && (
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-forest dark:text-ochre-light">
                              <FileCheck className="h-3 w-3" /> {uploaded}
                            </p>
                          )}
                        </div>
                        {uploaded ? (
                          <Button variant="ghost" size="sm" onClick={() => setUploadedDocs((p) => { const n = { ...p }; delete n[doc.key]; return n; })}>
                            <X className="h-3.5 w-3.5" /> Remove
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleFakeUpload(doc.key, doc.label)}>
                            <Upload className="h-3.5 w-3.5" /> Upload
                          </Button>
                        )}
                      </div>
                    );
                  })}
                  <p className="text-xs text-ink-soft/70 dark:text-paper/35">
                    Demo mode: clicking "Upload" simulates a file selection. Files are stored securely in Supabase Storage in production.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && selectedService && (
            <motion.div key="step3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <h2 className="mb-4 font-display text-lg font-medium text-ink dark:text-paper">Review your application</h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-ink/10 p-4 dark:border-white/10">
                  <p className="text-xs text-ink-soft dark:text-paper/50">Service</p>
                  <p className="text-sm font-medium text-ink dark:text-paper">{selectedService.name}</p>
                  <p className="mt-1 text-sm font-medium text-forest dark:text-ochre-light">{formatCurrency(selectedService.price)}</p>
                </div>
                <div className="rounded-lg border border-ink/10 p-4 dark:border-white/10">
                  <p className="mb-2 text-xs text-ink-soft dark:text-paper/50">Details</p>
                  <dl className="space-y-1.5">
                    {Object.entries(details).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <dt className="text-ink-soft dark:text-paper/55">{k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</dt>
                        <dd className="font-medium text-ink dark:text-paper">{v || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="rounded-lg border border-ink/10 p-4 dark:border-white/10">
                  <p className="mb-2 text-xs text-ink-soft dark:text-paper/50">Documents</p>
                  {Object.keys(uploadedDocs).length === 0 ? (
                    <p className="text-sm text-ink-soft dark:text-paper/45">No documents attached.</p>
                  ) : (
                    <ul className="space-y-1">
                      {Object.values(uploadedDocs).map((name) => (
                        <li key={name} className="flex items-center gap-1.5 text-sm text-ink dark:text-paper">
                          <FileCheck className="h-3.5 w-3.5 text-forest dark:text-ochre-light" /> {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && submitted && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest dark:bg-forest-light/15 dark:text-ochre-light"
              >
                <Check className="h-8 w-8" />
              </motion.div>
              <h2 className="mt-4 font-display text-xl font-medium text-ink dark:text-paper">Application submitted</h2>
              <p className="mt-1 max-w-sm text-sm text-ink-soft dark:text-paper/55">
                We've received your application and our team has started reviewing your documents. You'll get a notification at each step.
              </p>
              <Button className="mt-6" onClick={() => navigate(`/client/applications/${submitted}`)}>
                View application
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {step < 4 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={goBack} disabled={step === 0} className="gap-1.5">
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          {step === 3 ? (
            <Button onClick={handleSubmit} className="gap-1.5">
              Submit application <Check className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={goNext} disabled={step === 0 && !selectedService} className="gap-1.5">
              Continue <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
