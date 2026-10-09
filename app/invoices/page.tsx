import { invoices, clients } from '@/lib/sampleData';
import {
  formatCurrency,
  formatDate,
  getClientName,
  getOverdueInvoices,
} from '@/lib/invoiceUtils';
import { StatusBadge } from '@/components/StatusBadge';

export default function InvoicesPage() {
  const overdueInvoices = getOverdueInvoices(invoices);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">Invoices</h1>
      <p className="mt-2 text-gray-600">
        {invoices.length} invoices, {overdueInvoices.length} overdue
      </p>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th scope="col" className="py-2 px-3">
              Invoice
            </th>
            <th scope="col" className="py-2 px-3">
              Client
            </th>
            <th scope="col" className="py-2 px-3">
              Status
            </th>
            <th scope="col" className="py-2 px-3">
              Due
            </th>
            <th scope="col" className="py-2 px-3 text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr key={invoice.id} className="border-b border-gray-100">
                <td className="py-2 px-3">{invoice.id}</td>
                <td className="py-2 px-3">
                  {getClientName(clients, invoice.clientId)}
                </td>
                <td className="py-2 px-3">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="py-2 px-3">{formatDate(invoice.dueDate)}</td>
                <td className="py-2 px-3 text-right">
                  {formatCurrency(invoice.amountCents)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
