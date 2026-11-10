import { InvoiceStatus } from './schemas';

const clients = [
  { id: 'c1', name: 'Maple Leaf Bakery' },
  { id: 'c2', name: 'Northern Lights Studio' },
  { id: 'c3', name: 'Harbourfront Consulting' },
  { id: 'c4', name: 'Test Client' },
];

const invoices = [
  { id: 'inv-001', clientId: 'c1', amountCents: 125000, status: 'paid' },
  { id: 'inv-002', clientId: 'c2', amountCents: 84050, status: 'overdue' },
  { id: 'inv-003', clientId: 'c3', amountCents: 310000, status: 'sent' },
  { id: 'inv-004', clientId: 'c1', amountCents: 45000, status: 'draft' },
  { id: 'inv-005', clientId: 'c2', amountCents: 220000, status: 'paid' },
  { id: 'inv-006', clientId: 'c3', amountCents: 67500, status: 'overdue' },
];

//Print the names of all clients, as a list:
const ListOfClients = clients.map((client) => {
  return client.name;
});

console.log('ListOfClients:', ListOfClients);

//Print the one invoice whose id is 'inv-003'.
const SpecificInvoice = invoices.find((invoice) => invoice.id === 'inv-003');
console.log('SpecificInvoice:', SpecificInvoice);

//Print the total of all invoices with status 'paid'. The answer should be 345000.
const total = invoices
  .filter((invoice) => invoice.status === 'paid')
  .reduce((sum, invoice) => sum + invoice.amountCents, 0);

console.log('total:', total);

//Is there any overdue invoice? Print true or false.
const overdueInvoices = invoices.some(
  (invoice) => invoice.status === 'overdue',
);
console.log('overdueInvoices:', overdueInvoices);

//All invoices over $1,000. Print the list. Watch the units: the amounts are in cents, so what number do you compare with?
const invoicesOverThousands = invoices.filter(
  (invoice) => invoice.amountCents / 100 > 1000,
);

console.log('invoicesOverThousands:', invoicesOverThousands);

//The invoice IDs, sorted from largest amount to smallest. Print ['inv-003', 'inv-005', 'inv-001', 'inv-002', 'inv-006', 'inv-004'].
const sortedInvoices = [...invoices].sort(
  (a, b) => b.amountCents - a.amountCents,
);
const SortedInvoicesIds = sortedInvoices.map((invoice) => invoice.id);

console.log('SortedInvoicesIds:', SortedInvoicesIds);

//7: count invoices per status. The target is:
//{ draft: 1, sent: 1, paid: 2, overdue: 2 }
const statusCounts = invoices.reduce<Record<string, number>>(
  (counts, invoice) => {
    counts[invoice.status] = (counts[invoice.status] ?? 0) + 1;
    return counts;
  },
  {},
);

console.log('statusCounts:', statusCounts);

//8: clients with no invoices
const clientsWithoutInvoices = clients.filter(
  (client) => !invoices.some((invoice) => invoice.clientId === client.id),
);

console.log('clientsWithoutInvoices:', clientsWithoutInvoices);

//Input ->	Should print
//"2026-09-09". ->	Sep 9, 2026

const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
function formatDate(isoDate: string): string {
  return formatter.format(new Date(isoDate));
}

console.log('formatDate:', formatDate('2026-09-09'));
