export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export type Client = {
  id: string;
  name: string;
  email: string;
};

export type Invoice = {
  id: string;
  clientId: string;
  amountCents: number;
  status: InvoiceStatus;
  issuedDate: string; // ISO format, e.g. "2026-09-01"
  dueDate: string;
  note?: string;
};
