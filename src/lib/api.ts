import { invoiceSchema } from './schemas';
import type { Invoice, NewInvoice } from '@/types';
import { z } from 'zod';

export async function fetchInvoices(): Promise<Invoice[]> {
  const response = await fetch('/api/invoices');
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const result = await response.json();
  return z.array(invoiceSchema).parse(result);
}

export async function createInvoice(newInvoice: NewInvoice): Promise<Invoice> {
  const response = await fetch('/api/invoices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newInvoice),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(
      typeof body.error === 'string' ? body.error : 'Something went wrong.',
    );
  }
  return invoiceSchema.parse(body);
}
