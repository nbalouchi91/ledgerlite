import { z } from 'zod';

export const invoiceStatusSchema = z.enum(['draft', 'sent', 'paid', 'overdue']);
export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;

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

export const newInvoiceSchema = invoiceSchema.omit({ id: true, status: true });
export type NewInvoice = z.infer<typeof newInvoiceSchema>;
