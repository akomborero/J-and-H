import type {
  Profile,
  Application,
  TimelineEvent,
  InternalTask,
  Invoice,
  SupportTicket,
  KbArticle,
  Notification,
  StaffMember,
  ComplianceRecord,
  CrmNote,
} from "../../types";

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};
const daysFromNow = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

// ── Profiles ────────────────────────────────────────────────────────────
export const profiles: Profile[] = [
  {
    id: "client-1",
    role: "client",
    fullName: "Tendai Moyo",
    email: "tendai.moyo@example.com",
    phone: "+263 77 123 4567",
    nationalId: "63-123456A78",
    address: "12 Borrowdale Road, Harare",
    companyName: "Moyo Logistics PBC",
    companyRegNumber: "PBC/2024/00451",
    branch: "Harare",
    referralCode: "TENDAI10",
    createdAt: daysAgo(120),
  },
  {
    id: "client-2",
    role: "client",
    fullName: "Rumbidzai Chikafu",
    email: "rumbi.chikafu@example.com",
    phone: "+263 71 987 6543",
    nationalId: "08-654321B12",
    address: "45 Josiah Tongogara St, Bulawayo",
    companyName: "Chikafu Traders (Pvt) Ltd",
    companyRegNumber: "PVT/2023/01187",
    branch: "Bulawayo",
    referralCode: "RUMBI22",
    createdAt: daysAgo(95),
  },
  {
    id: "admin-1",
    role: "admin",
    fullName: "Farai Ndlovu",
    email: "farai@jhconsultancy.co.zw",
    phone: "+263 77 555 0101",
    branch: "Harare",
    referralCode: "STAFF-FN01",
    createdAt: daysAgo(400),
  },
  {
    id: "admin-2",
    role: "admin",
    fullName: "Chiedza Mutasa",
    email: "chiedza@jhconsultancy.co.zw",
    phone: "+263 77 555 0102",
    branch: "Mutare",
    referralCode: "STAFF-CM02",
    createdAt: daysAgo(310),
  },
  {
    id: "super-1",
    role: "super_admin",
    fullName: "Hilary Jenrose",
    email: "hilary@jhconsultancy.co.zw",
    phone: "+263 77 555 0001",
    branch: "Harare",
    referralCode: "STAFF-HJ00",
    createdAt: daysAgo(600),
  },
];

export const currentClientId = "client-1";

// ── Applications ────────────────────────────────────────────────────────
export const applications: Application[] = [
  {
    id: "app-1",
    refNumber: "JH-2026-0142",
    clientId: "client-1",
    clientName: "Tendai Moyo",
    serviceId: "svc-pvt-ltd",
    serviceName: "Private Limited Company Registration",
    branch: "Harare",
    status: "processing",
    details: {
      proposedName1: "Moyo Freight Solutions",
      businessActivity: "Freight and logistics",
      numDirectors: "2",
      shareCapital: "500",
    },
    documents: [
      { id: "doc-1", name: "director_id_tendai.pdf", url: "#", uploadedAt: daysAgo(8), sizeKb: 412, kind: "uploaded" },
      { id: "doc-2", name: "proof_of_address.pdf", url: "#", uploadedAt: daysAgo(8), sizeKb: 230, kind: "uploaded" },
    ],
    assignedStaffId: "admin-1",
    assignedStaffName: "Farai Ndlovu",
    createdAt: daysAgo(8),
    updatedAt: daysAgo(1),
    dueDate: daysFromNow(2),
  },
  {
    id: "app-2",
    refNumber: "JH-2026-0151",
    clientId: "client-1",
    clientName: "Tendai Moyo",
    serviceId: "svc-tax-clearance",
    serviceName: "Tax Clearance Certificate (ITF263)",
    branch: "Harare",
    status: "completed",
    details: { bpNumber: "200-554-321" },
    documents: [
      { id: "doc-3", name: "latest_returns.pdf", url: "#", uploadedAt: daysAgo(20), sizeKb: 180, kind: "uploaded" },
      { id: "doc-4", name: "ITF263_certificate.pdf", url: "#", uploadedAt: daysAgo(11), sizeKb: 95, kind: "certificate" },
    ],
    assignedStaffId: "admin-1",
    assignedStaffName: "Farai Ndlovu",
    createdAt: daysAgo(22),
    updatedAt: daysAgo(11),
  },
  {
    id: "app-3",
    refNumber: "JH-2026-0163",
    clientId: "client-1",
    clientName: "Tendai Moyo",
    serviceId: "svc-nssa-reg",
    serviceName: "NSSA Registration",
    branch: "Harare",
    status: "documents_verified",
    details: { companyRegNumber: "PBC/2024/00451", numEmployees: "4" },
    documents: [
      { id: "doc-5", name: "employee_list.pdf", url: "#", uploadedAt: daysAgo(3), sizeKb: 140, kind: "uploaded" },
    ],
    assignedStaffId: "admin-2",
    assignedStaffName: "Chiedza Mutasa",
    createdAt: daysAgo(3),
    updatedAt: daysAgo(2),
    dueDate: daysFromNow(4),
  },
  {
    id: "app-4",
    refNumber: "JH-2026-0099",
    clientId: "client-2",
    clientName: "Rumbidzai Chikafu",
    serviceId: "svc-vat",
    serviceName: "VAT Registration",
    branch: "Bulawayo",
    status: "submitted",
    details: { bpNumber: "200-998-112", annualTurnover: "120000" },
    documents: [],
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    dueDate: daysFromNow(7),
  },
  {
    id: "app-5",
    refNumber: "JH-2026-0078",
    clientId: "client-2",
    clientName: "Rumbidzai Chikafu",
    serviceId: "svc-praz-reg",
    serviceName: "PRAZ Registration",
    branch: "Bulawayo",
    status: "awaiting_approval",
    details: { supplyCategory: "Office supplies", yearsInOperation: "3" },
    documents: [
      { id: "doc-6", name: "tax_clearance.pdf", url: "#", uploadedAt: daysAgo(14), sizeKb: 90, kind: "uploaded" },
    ],
    assignedStaffId: "admin-2",
    assignedStaffName: "Chiedza Mutasa",
    createdAt: daysAgo(16),
    updatedAt: daysAgo(2),
    dueDate: daysFromNow(1),
  },
];

// ── Timeline events ─────────────────────────────────────────────────────
export const timelineEvents: TimelineEvent[] = [
  { id: "tl-1", applicationId: "app-1", type: "application_submitted", description: "Application submitted for Private Limited Company Registration", actor: "Tendai Moyo", createdAt: daysAgo(8) },
  { id: "tl-2", applicationId: "app-1", type: "documents_uploaded", description: "Director ID and proof of address uploaded", actor: "Tendai Moyo", createdAt: daysAgo(8) },
  { id: "tl-3", applicationId: "app-1", type: "status_updated", description: "Documents verified by compliance team", actor: "Farai Ndlovu", createdAt: daysAgo(6) },
  { id: "tl-4", applicationId: "app-1", type: "invoice_generated", description: "Invoice JH-INV-1042 generated for $180.00", actor: "Farai Ndlovu", createdAt: daysAgo(6) },
  { id: "tl-5", applicationId: "app-1", type: "payment_verified", description: "Proof of payment verified", actor: "Farai Ndlovu", createdAt: daysAgo(4) },
  { id: "tl-6", applicationId: "app-1", type: "status_updated", description: "Name search completed, moved to processing", actor: "Farai Ndlovu", createdAt: daysAgo(1) },

  { id: "tl-7", applicationId: "app-2", type: "application_submitted", description: "Application submitted for Tax Clearance Certificate", actor: "Tendai Moyo", createdAt: daysAgo(22) },
  { id: "tl-8", applicationId: "app-2", type: "documents_uploaded", description: "Latest tax returns uploaded", actor: "Tendai Moyo", createdAt: daysAgo(20) },
  { id: "tl-9", applicationId: "app-2", type: "status_updated", description: "Submitted to ZIMRA for processing", actor: "Farai Ndlovu", createdAt: daysAgo(15) },
  { id: "tl-10", applicationId: "app-2", type: "documents_completed", description: "ITF263 certificate issued and uploaded", actor: "Farai Ndlovu", createdAt: daysAgo(11) },

  { id: "tl-11", applicationId: "app-3", type: "application_submitted", description: "Application submitted for NSSA Registration", actor: "Tendai Moyo", createdAt: daysAgo(3) },
  { id: "tl-12", applicationId: "app-3", type: "documents_uploaded", description: "Employee list uploaded", actor: "Tendai Moyo", createdAt: daysAgo(3) },
  { id: "tl-13", applicationId: "app-3", type: "status_updated", description: "Documents verified", actor: "Chiedza Mutasa", createdAt: daysAgo(2) },
];

// ── Internal tasks ──────────────────────────────────────────────────────
export const internalTasks: InternalTask[] = [
  { id: "task-1", applicationId: "app-1", applicationRef: "JH-2026-0142", title: "Name Search", status: "completed", assignedStaffId: "admin-1", assignedStaffName: "Farai Ndlovu", createdAt: daysAgo(8), completedAt: daysAgo(6) },
  { id: "task-2", applicationId: "app-1", applicationRef: "JH-2026-0142", title: "CR14 Preparation", status: "in_progress", assignedStaffId: "admin-1", assignedStaffName: "Farai Ndlovu", createdAt: daysAgo(6) },
  { id: "task-3", applicationId: "app-1", applicationRef: "JH-2026-0142", title: "Submission to Registrar", status: "pending", assignedStaffId: "admin-1", assignedStaffName: "Farai Ndlovu", createdAt: daysAgo(6) },
  { id: "task-4", applicationId: "app-1", applicationRef: "JH-2026-0142", title: "Verification & Certificate Collection", status: "pending", createdAt: daysAgo(6) },
  { id: "task-5", applicationId: "app-3", applicationRef: "JH-2026-0163", title: "Employer Registration Form", status: "in_progress", assignedStaffId: "admin-2", assignedStaffName: "Chiedza Mutasa", createdAt: daysAgo(3) },
  { id: "task-6", applicationId: "app-3", applicationRef: "JH-2026-0163", title: "NSSA Submission", status: "pending", createdAt: daysAgo(3) },
  { id: "task-7", applicationId: "app-5", applicationRef: "JH-2026-0078", title: "PRAZ Document Compilation", status: "completed", assignedStaffId: "admin-2", assignedStaffName: "Chiedza Mutasa", createdAt: daysAgo(16), completedAt: daysAgo(10) },
  { id: "task-8", applicationId: "app-5", applicationRef: "JH-2026-0078", title: "PRAZ Portal Submission", status: "completed", assignedStaffId: "admin-2", assignedStaffName: "Chiedza Mutasa", createdAt: daysAgo(10), completedAt: daysAgo(4) },
  { id: "task-9", applicationId: "app-5", applicationRef: "JH-2026-0078", title: "Awaiting Board Approval", status: "in_progress", assignedStaffId: "admin-2", assignedStaffName: "Chiedza Mutasa", createdAt: daysAgo(4) },
];

// ── Invoices ────────────────────────────────────────────────────────────
export const invoices: Invoice[] = [
  { id: "inv-1", invoiceNumber: "JH-INV-1042", clientId: "client-1", clientName: "Tendai Moyo", applicationId: "app-1", serviceName: "Private Limited Company Registration", amount: 180, status: "paid", issueDate: daysAgo(6), dueDate: daysAgo(1) },
  { id: "inv-2", invoiceNumber: "JH-INV-1038", clientId: "client-1", clientName: "Tendai Moyo", applicationId: "app-2", serviceName: "Tax Clearance Certificate", amount: 50, status: "paid", issueDate: daysAgo(20), dueDate: daysAgo(13) },
  { id: "inv-3", invoiceNumber: "JH-INV-1051", clientId: "client-1", clientName: "Tendai Moyo", applicationId: "app-3", serviceName: "NSSA Registration", amount: 45, status: "sent", issueDate: daysAgo(2), dueDate: daysFromNow(5) },
  { id: "inv-4", invoiceNumber: "JH-INV-1029", clientId: "client-2", clientName: "Rumbidzai Chikafu", applicationId: "app-5", serviceName: "PRAZ Registration", amount: 70, status: "overdue", issueDate: daysAgo(16), dueDate: daysAgo(2) },
  { id: "inv-5", invoiceNumber: "JH-INV-1055", clientId: "client-2", clientName: "Rumbidzai Chikafu", applicationId: "app-4", serviceName: "VAT Registration", amount: 60, status: "draft", issueDate: daysAgo(1), dueDate: daysFromNow(6) },
];

// ── Support tickets ─────────────────────────────────────────────────────
export const supportTickets: SupportTicket[] = [
  {
    id: "tkt-1",
    ticketNumber: "TCK-3021",
    clientId: "client-1",
    clientName: "Tendai Moyo",
    subject: "Question about CR14 turnaround time",
    status: "in_progress",
    priority: "medium",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
    messages: [
      { id: "msg-1", author: "Tendai Moyo", authorRole: "client", body: "Hi, just checking how long the CR14 preparation usually takes for a Pvt Ltd registration?", createdAt: daysAgo(2) },
      { id: "msg-2", author: "Farai Ndlovu", authorRole: "admin", body: "Hi Tendai, CR14 prep typically takes 2-3 business days once name search is approved. Yours is currently in progress.", createdAt: daysAgo(1) },
    ],
  },
  {
    id: "tkt-2",
    ticketNumber: "TCK-3015",
    clientId: "client-2",
    clientName: "Rumbidzai Chikafu",
    subject: "Invoice JH-INV-1029 payment query",
    status: "open",
    priority: "high",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    messages: [
      { id: "msg-3", author: "Rumbidzai Chikafu", authorRole: "client", body: "I made the payment via EcoCash yesterday but the invoice still shows overdue. Can someone check?", createdAt: daysAgo(1) },
    ],
  },
];

// ── Knowledge base ──────────────────────────────────────────────────────
export const kbArticles: KbArticle[] = [
  { id: "kb-1", topic: "Company Registration", title: "How long does Private Limited Company registration take?", body: "Typically 7–10 business days from name search approval to certificate issuance, assuming all documents are submitted correctly the first time.", views: 412 },
  { id: "kb-2", topic: "Company Registration", title: "What's the difference between a PBC and a Pvt Ltd?", body: "A PBC (Private Business Corporation) is faster and cheaper to register, suited to small and micro businesses, while a Pvt Ltd offers more flexibility for raising capital and is preferred for larger operations.", views: 358 },
  { id: "kb-3", topic: "Tax Requirements", title: "What documents do I need for a BP Number?", body: "You'll need your Certificate of Incorporation, latest CR14, and a director's National ID. Processing usually takes 5 business days.", views: 290 },
  { id: "kb-4", topic: "VAT Registration", title: "When am I required to register for VAT?", body: "Registration becomes mandatory once your taxable annual turnover exceeds the ZIMRA threshold. Voluntary registration is also possible below that threshold.", views: 201 },
  { id: "kb-5", topic: "PRAZ Registration", title: "How often do I need to renew my PRAZ registration?", body: "PRAZ supplier registration is renewed annually. We recommend starting the renewal process at least 30 days before expiry.", views: 167 },
  { id: "kb-6", topic: "NSSA Compliance", title: "What happens if I miss a P4 returns deadline?", body: "Late P4 submissions can attract penalties from NSSA. We send automatic reminders 7 days before each monthly deadline to help you stay compliant.", views: 145 },
];

// ── Notifications ───────────────────────────────────────────────────────
export const notifications: Notification[] = [
  { id: "ntf-1", userId: "client-1", title: "Application moved to Processing", body: "Your Private Limited Company Registration (JH-2026-0142) is now being processed.", read: false, createdAt: daysAgo(1), channel: "in_app" },
  { id: "ntf-2", userId: "client-1", title: "Invoice generated", body: "Invoice JH-INV-1051 for $45.00 has been generated for your NSSA Registration.", read: false, createdAt: daysAgo(2), channel: "email" },
  { id: "ntf-3", userId: "client-1", title: "Documents verified", body: "Documents for JH-2026-0163 have been verified by our compliance team.", read: true, createdAt: daysAgo(2), channel: "in_app" },
  { id: "ntf-4", userId: "client-1", title: "Certificate ready", body: "Your Tax Clearance Certificate is ready to download.", read: true, createdAt: daysAgo(11), channel: "whatsapp" },
];

// ── Staff performance ────────────────────────────────────────────────────
export const staffMembers: StaffMember[] = [
  { id: "admin-1", fullName: "Farai Ndlovu", email: "farai@jhconsultancy.co.zw", role: "admin", branch: "Harare", applicationsProcessed: 64, tasksCompleted: 211, revenueGenerated: 9840, avgCompletionDays: 6.2, pendingTasks: 5 },
  { id: "admin-2", fullName: "Chiedza Mutasa", email: "chiedza@jhconsultancy.co.zw", role: "admin", branch: "Mutare", applicationsProcessed: 51, tasksCompleted: 178, revenueGenerated: 7420, avgCompletionDays: 7.1, pendingTasks: 3 },
  { id: "admin-3", fullName: "Blessing Sibanda", email: "blessing@jhconsultancy.co.zw", role: "admin", branch: "Bulawayo", applicationsProcessed: 38, tasksCompleted: 132, revenueGenerated: 5990, avgCompletionDays: 8.4, pendingTasks: 6 },
];

// ── Compliance / renewals ───────────────────────────────────────────────
export const complianceRecords: ComplianceRecord[] = [
  { id: "cmp-1", clientId: "client-1", clientName: "Tendai Moyo", type: "tax_clearance", expiryDate: daysFromNow(18), status: "expiring_soon" },
  { id: "cmp-2", clientId: "client-2", clientName: "Rumbidzai Chikafu", type: "praz", expiryDate: daysFromNow(45), status: "valid" },
  { id: "cmp-3", clientId: "client-2", clientName: "Rumbidzai Chikafu", type: "nssa", expiryDate: daysAgo(3), status: "expired" },
  { id: "cmp-4", clientId: "client-1", clientName: "Tendai Moyo", type: "annual_returns", expiryDate: daysFromNow(60), status: "valid" },
];

// ── CRM notes ────────────────────────────────────────────────────────────
export const crmNotes: CrmNote[] = [
  { id: "note-1", clientId: "client-1", author: "Farai Ndlovu", body: "Mentioned he's expanding fleet — good upsell opportunity for VAT registration once turnover grows.", createdAt: daysAgo(5) },
  { id: "note-2", clientId: "client-2", author: "Chiedza Mutasa", body: "Prefers WhatsApp updates over email. Always quick to respond.", createdAt: daysAgo(9) },
];

export const findApplicationsByClient = (clientId: string) =>
  applications.filter((a) => a.clientId === clientId);

export const findTimelineForApplication = (applicationId: string) =>
  timelineEvents
    .filter((t) => t.applicationId === applicationId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

export const findTasksForApplication = (applicationId: string) =>
  internalTasks.filter((t) => t.applicationId === applicationId);
