import { Client, Invoice, InvoiceStatus } from '@/types';

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(cents / 100);
}

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

export function getTotalByStatus(
  invoices: Invoice[],
  status: InvoiceStatus,
): number {
  return invoices
    .filter((invoice) => invoice.status === status)
    .reduce((total, invoice) => total + invoice.amountCents, 0);
}

export function getClientName(clients: Client[], clientId: string): string {
  const client = clients.find((c) => c.id === clientId);
  return client?.name ?? 'Unknown client';
}

export function getOverdueInvoices(invoices: Invoice[]): Invoice[] {
  return invoices
    .filter((invoice) => invoice.status === 'overdue')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function getInvoicesForClient(
  invoices: Invoice[],
  clientId: string,
): Invoice[] {
  return invoices.filter((invoice) => invoice.clientId === clientId);
}

export function getOutstandingTotal(invoices: Invoice[]): number {
  // Owed = sent or overdue; drafts aren't issued yet, paid is settled.
  const OUTSTANDING_STATUSES: InvoiceStatus[] = ['sent', 'overdue'];
  return invoices
    .filter((invoice) => OUTSTANDING_STATUSES.includes(invoice.status))
    .reduce((total, invoice) => total + invoice.amountCents, 0);
}
