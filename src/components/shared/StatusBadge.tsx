import { Badge } from "../ui/Badge";
import type { ApplicationStatus, InvoiceStatus, TicketStatus, TaskStatus } from "../../types";

const applicationStatusMap: Record<ApplicationStatus, { label: string; variant: "default" | "forest" | "ochre" | "blue" | "success" | "danger" }> = {
  submitted: { label: "Submitted", variant: "ochre" },
  documents_verified: { label: "Documents Verified", variant: "blue" },
  under_review: { label: "Under Review", variant: "blue" },
  processing: { label: "Processing", variant: "blue" },
  awaiting_approval: { label: "Awaiting Approval", variant: "ochre" },
  completed: { label: "Completed", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
};

const invoiceStatusMap: Record<InvoiceStatus, { label: string; variant: "default" | "forest" | "ochre" | "blue" | "success" | "danger" }> = {
  draft: { label: "Draft", variant: "default" },
  sent: { label: "Sent", variant: "blue" },
  paid: { label: "Paid", variant: "success" },
  overdue: { label: "Overdue", variant: "danger" },
  cancelled: { label: "Cancelled", variant: "default" },
};

const ticketStatusMap: Record<TicketStatus, { label: string; variant: "default" | "forest" | "ochre" | "blue" | "success" | "danger" }> = {
  open: { label: "Open", variant: "ochre" },
  in_progress: { label: "In Progress", variant: "blue" },
  resolved: { label: "Resolved", variant: "success" },
  closed: { label: "Closed", variant: "default" },
};

const taskStatusMap: Record<TaskStatus, { label: string; variant: "default" | "forest" | "ochre" | "blue" | "success" | "danger" }> = {
  pending: { label: "Pending", variant: "default" },
  in_progress: { label: "In Progress", variant: "blue" },
  completed: { label: "Completed", variant: "success" },
  blocked: { label: "Blocked", variant: "danger" },
};

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const config = applicationStatusMap[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const config = invoiceStatusMap[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  const config = ticketStatusMap[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const config = taskStatusMap[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
