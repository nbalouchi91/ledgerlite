import { invoiceSchema } from './schemas';

const good = {
  id: 'x1',
  clientId: 'c1',
  amountCents: 5000,
  status: 'draft',
  issuedDate: '2026-10-15',
  dueDate: '2026-11-15',
};

const cases: [string, unknown][] = [
  ['good invoice', good],
  ['negative amount', { ...good, amountCents: -5 }],
  ['decimal amount', { ...good, amountCents: 12.5 }],
  ['bad status', { ...good, status: 'payed' }],
  ['Feb 31', { ...good, dueDate: '2026-02-31' }],
  ['empty clientId', { ...good, clientId: '' }],
];

for (const [name, input] of cases) {
  const result = invoiceSchema.safeParse(input);
  console.log(
    name,
    '->',
    result.success
      ? 'OK'
      : result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
  );
}
