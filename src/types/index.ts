// ── Core domain types ────────────────────────────────────────────────────
// These mirror the production Supabase schema 1:1 so this standalone
// frontend can later be pointed at the real backend with minimal changes.

export type UserRole = "client" | "admin" | "super_admin";

export type ApplicationStatus =
  | "submitted"
  | "documents_verified"
  | "under_review"
  | "processing"
  | "awaiting_approval"
  | "completed"
  | "rejected";

export type TaskStatus = "pending" | "in_progress" | "completed" | "blocked";

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type Branch = "Harare" | "Bulawayo" | "Mutare";

export type ServiceCategory =
  | "company_registration"
  | "tax_services"
  | "compliance_services"
  | "business_support";

export interface Profile {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  nationalId?: string;
  address?: string;
  companyName?: string;
  companyRegNumber?: string;
  branch: Branch;
  referralCode: string;
  createdAt: string;
}

export interface ServiceFieldSchema {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "textarea";
  required: boolean;
  options?: string[];
}

export interface ServiceDocRequirement {
  key: string;
  label: string;
  required: boolean;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  fields: ServiceFieldSchema[];
  documents: ServiceDocRequirement[];
  popular?: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  serviceIds: string[];
  price: number;
  discountPercent: number;
}

export interface UploadedDocument {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  sizeKb: number;
  kind: "uploaded" | "generated" | "certificate";
}

export interface Application {
  id: string;
  refNumber: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  branch: Branch;
  status: ApplicationStatus;
  details: Record<string, string>;
  documents: UploadedDocument[];
  assignedStaffId?: string;
  assignedStaffName?: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface TimelineEvent {
  id: string;
  applicationId: string;
  type:
    | "application_submitted"
    | "documents_uploaded"
    | "invoice_generated"
    | "payment_verified"
    | "status_updated"
    | "documents_completed"
    | "note";
  description: string;
  actor: string;
  createdAt: string;
}

export interface InternalTask {
  id: string;
  applicationId: string;
  applicationRef: string;
  title: string;
  status: TaskStatus;
  assignedStaffId?: string;
  assignedStaffName?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  applicationId?: string;
  serviceName: string;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  proofOfPaymentUrl?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  clientId: string;
  clientName: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  author: string;
  authorRole: UserRole;
  body: string;
  createdAt: string;
  attachmentUrl?: string;
}

export interface KbArticle {
  id: string;
  topic: string;
  title: string;
  body: string;
  views: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  channel: "in_app" | "email" | "whatsapp";
}

export interface StaffMember {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  branch: Branch;
  applicationsProcessed: number;
  tasksCompleted: number;
  revenueGenerated: number;
  avgCompletionDays: number;
  pendingTasks: number;
}

export interface ComplianceRecord {
  id: string;
  clientId: string;
  clientName: string;
  type: "tax_clearance" | "praz" | "nssa" | "annual_returns";
  expiryDate: string;
  status: "valid" | "expiring_soon" | "expired";
}

export interface CrmNote {
  id: string;
  clientId: string;
  author: string;
  body: string;
  createdAt: string;
}
