import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  Application,
  ApplicationStatus,
  Invoice,
  Notification,
  SupportTicket,
  TicketMessage,
  TimelineEvent,
  InternalTask,
} from "../types";
import {
  applications as seedApplications,
  timelineEvents as seedTimeline,
  internalTasks as seedTasks,
  invoices as seedInvoices,
  supportTickets as seedTickets,
  notifications as seedNotifications,
} from "../mock/data/seed";
import { findService } from "../mock/data/services";

interface DataStoreValue {
  applications: Application[];
  timelineEvents: TimelineEvent[];
  internalTasks: InternalTask[];
  invoices: Invoice[];
  supportTickets: SupportTicket[];
  notifications: Notification[];

  createApplication: (input: {
    clientId: string;
    clientName: string;
    serviceId: string;
    branch: Application["branch"];
    details: Record<string, string>;
    documents: Application["documents"];
  }) => Application;

  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, actor: string) => void;

  addTimelineEvent: (event: Omit<TimelineEvent, "id" | "createdAt">) => void;

  updateTaskStatus: (taskId: string, status: InternalTask["status"]) => void;

  createTicket: (input: { clientId: string; clientName: string; subject: string; priority: SupportTicket["priority"]; body: string }) => SupportTicket;

  addTicketMessage: (ticketId: string, message: Omit<TicketMessage, "id" | "createdAt">) => void;

  markNotificationRead: (id: string) => void;

  generateInvoice: (input: { clientId: string; clientName: string; applicationId: string; serviceName: string; amount: number; dueInDays: number }) => Invoice;
}

const DataStoreContext = createContext<DataStoreValue | undefined>(undefined);

let appCounter = 200;
let invCounter = 1100;
let ticketCounter = 4001;
let taskCounter = 100;
let timelineCounter = 100;

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(seedApplications);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(seedTimeline);
  const [internalTasks, setInternalTasks] = useState<InternalTask[]>(seedTasks);
  const [invoices, setInvoices] = useState<Invoice[]>(seedInvoices);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(seedTickets);
  const [notifications, setNotifications] = useState<Notification[]>(seedNotifications);

  const addTimelineEvent: DataStoreValue["addTimelineEvent"] = (event) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: `tl-${timelineCounter++}`,
      createdAt: new Date().toISOString(),
    };
    setTimelineEvents((prev) => [...prev, newEvent]);
  };

  const createApplication: DataStoreValue["createApplication"] = ({
    clientId,
    clientName,
    serviceId,
    branch,
    details,
    documents,
  }) => {
    const service = findService(serviceId);
    const refNumber = `JH-2026-${(appCounter++).toString().padStart(4, "0")}`;
    const newApp: Application = {
      id: `app-${refNumber}`,
      refNumber,
      clientId,
      clientName,
      serviceId,
      serviceName: service?.name ?? "Service",
      branch,
      status: "submitted",
      details,
      documents,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setApplications((prev) => [newApp, ...prev]);

    // Auto-create internal tasks, mirroring the trigger-based task creation
    // that happens server-side in production.
    const defaultTasks = ["Document Verification", "Processing", "Final Review"];
    const newTasks: InternalTask[] = defaultTasks.map((title, i) => ({
      id: `task-${taskCounter++}`,
      applicationId: newApp.id,
      applicationRef: refNumber,
      title,
      status: i === 0 ? "pending" : "pending",
      createdAt: new Date().toISOString(),
    }));
    setInternalTasks((prev) => [...newTasks, ...prev]);

    addTimelineEvent({
      applicationId: newApp.id,
      type: "application_submitted",
      description: `Application submitted for ${newApp.serviceName}`,
      actor: clientName,
    });
    if (documents.length > 0) {
      addTimelineEvent({
        applicationId: newApp.id,
        type: "documents_uploaded",
        description: `${documents.length} document(s) uploaded`,
        actor: clientName,
      });
    }

    return newApp;
  };

  const updateApplicationStatus: DataStoreValue["updateApplicationStatus"] = (applicationId, status, actor) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status, updatedAt: new Date().toISOString() } : a))
    );
    addTimelineEvent({
      applicationId,
      type: "status_updated",
      description: `Status updated to "${status.replace(/_/g, " ")}"`,
      actor,
    });
  };

  const updateTaskStatus: DataStoreValue["updateTaskStatus"] = (taskId, status) => {
    setInternalTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status, completedAt: status === "completed" ? new Date().toISOString() : t.completedAt }
          : t
      )
    );
  };

  const createTicket: DataStoreValue["createTicket"] = ({ clientId, clientName, subject, priority, body }) => {
    const ticketNumber = `TCK-${ticketCounter++}`;
    const newTicket: SupportTicket = {
      id: `tkt-${ticketNumber}`,
      ticketNumber,
      clientId,
      clientName,
      subject,
      status: "open",
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${ticketNumber}-1`,
          author: clientName,
          authorRole: "client",
          body,
          createdAt: new Date().toISOString(),
        },
      ],
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const addTicketMessage: DataStoreValue["addTicketMessage"] = (ticketId, message) => {
    setSupportTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              updatedAt: new Date().toISOString(),
              messages: [
                ...t.messages,
                { ...message, id: `msg-${ticketId}-${t.messages.length + 1}`, createdAt: new Date().toISOString() },
              ],
            }
          : t
      )
    );
  };

  const markNotificationRead: DataStoreValue["markNotificationRead"] = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const generateInvoice: DataStoreValue["generateInvoice"] = ({
    clientId,
    clientName,
    applicationId,
    serviceName,
    amount,
    dueInDays,
  }) => {
    const invoiceNumber = `JH-INV-${invCounter++}`;
    const due = new Date();
    due.setDate(due.getDate() + dueInDays);
    const newInvoice: Invoice = {
      id: `inv-${invoiceNumber}`,
      invoiceNumber,
      clientId,
      clientName,
      applicationId,
      serviceName,
      amount,
      status: "sent",
      issueDate: new Date().toISOString(),
      dueDate: due.toISOString(),
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    addTimelineEvent({
      applicationId,
      type: "invoice_generated",
      description: `Invoice ${invoiceNumber} generated for $${amount.toFixed(2)}`,
      actor: "System",
    });
    return newInvoice;
  };

  const value: DataStoreValue = {
    applications,
    timelineEvents,
    internalTasks,
    invoices,
    supportTickets,
    notifications,
    createApplication,
    updateApplicationStatus,
    addTimelineEvent,
    updateTaskStatus,
    createTicket,
    addTicketMessage,
    markNotificationRead,
    generateInvoice,
  };

  return <DataStoreContext.Provider value={value}>{children}</DataStoreContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDataStore() {
  const ctx = useContext(DataStoreContext);
  if (!ctx) throw new Error("useDataStore must be used within DataStoreProvider");
  return ctx;
}
