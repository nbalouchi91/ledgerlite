import { invoiceSchema } from './schemas';
import type { Invoice } from '@/types';
import { z } from 'zod';

export async function fetchInvoices(): Promise<Invoice[]> {
  const response = await fetch('/api/invoices');
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const result = await response.json();
  return z.array(invoiceSchema).parse(result);
}
