import { z } from 'zod';
//InvoiceStatus, Client and Invoice types

export const invoiceStatusSchema = z.enum(['draft', 'sent', 'paid', 'overdue']);
export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;

export const clientSchemas = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export type Client = z.infer<typeof clientSchemas>;

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use the format YYYY-MM-DD')
  .refine((value) => {
    const date = new Date(value);
    return (
      !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    );
  }, 'Not a real calendar date');

export const invoiceSchema = z.object({
  id: z.string().min(1),
  clientId: z.string().min(1),
  amountCents: z.number().int().positive(),
  status: invoiceStatusSchema,
  issuedDate: isoDateSchema,
  dueDate: isoDateSchema,
  note: z.string().max(500).optional(),
});

export type Invoice = z.infer<typeof invoiceSchema>;

//getClientName(clients, clientId), returning "Unknown client" if none match
export function getClientName(clients: Client[], clientId: string) {
  const client = clients.find((c) => c.id === clientId);
  return client?.name ?? 'Unknown client';
}

//getTotalByStatus(invoices, status), using filter then reduce

export function getTotalByStatus(invoices: Invoice[], status: InvoiceStatus) {
  return invoices
    .filter((invoice) => invoice.status === status)
    .reduce((total, invoice) => total + invoice.amountCents, 0);
}
