import {
  formatCurrency,
  getInvoicesForClient,
  getOutstandingTotal,
} from '@/lib/invoiceUtils';
import { clients, invoices } from '@/lib/sampleData';

export default function ClientsPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">Clients</h1>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th scope="col" className="py-2 px-3">
              Client name
            </th>
            <th scope="col" className="py-2 px-3 text-right">
              Invoices
            </th>
            <th scope="col" className="py-2 px-3 text-right">
              Outstanding
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const clientInvoices = getInvoicesForClient(invoices, client.id);
            return (
              <tr key={client.id} className="border-b border-gray-100">
                <td className="py-2 px-3">{client.name}</td>
                <td className="py-2 px-3 text-right">
                  {clientInvoices.length}
                </td>
                <td className="py-2 px-3 text-right">
                  {formatCurrency(getOutstandingTotal(clientInvoices))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
