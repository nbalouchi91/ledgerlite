import { Client, Invoice } from '@/types';

export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Maple Leaf Bakery',
    email: 'orders@mapleleafbakery.example',
  },
  {
    id: 'c2',
    name: 'Northern Lights Studio',
    email: 'hello@northernlights.example',
  },
  {
    id: 'c3',
    name: 'Harbourfront Consulting',
    email: 'billing@harbourfront.example',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'inv-001',
    clientId: 'c1',
    amountCents: 125000,
    status: 'paid',
    issuedDate: '2026-08-01',
    dueDate: '2026-08-31',
  },
  {
    id: 'inv-002',
    clientId: 'c2',
    amountCents: 84050,
    status: 'overdue',
    issuedDate: '2026-08-10',
    dueDate: '2026-09-09',
    note: 'Second reminder sent',
  },
  {
    id: 'inv-003',
    clientId: 'c3',
    amountCents: 310000,
    status: 'sent',
    issuedDate: '2026-09-15',
    dueDate: '2026-10-15',
  },
  {
    id: 'inv-004',
    clientId: 'c1',
    amountCents: 45000,
    status: 'draft',
    issuedDate: '2026-10-01',
    dueDate: '2026-10-31',
  },
  {
    id: 'inv-005',
    clientId: 'c2',
    amountCents: 220000,
    status: 'paid',
    issuedDate: '2026-07-20',
    dueDate: '2026-08-19',
  },
  {
    id: 'inv-006',
    clientId: 'c3',
    amountCents: 67500,
    status: 'overdue',
    issuedDate: '2026-08-25',
    dueDate: '2026-09-24',
  },
];
