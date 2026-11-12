'use client';

import { fetchInvoices } from '@/lib/api';
import {
  formatCurrency,
  getInvoicesForClient,
  getOutstandingTotal,
} from '@/lib/invoiceUtils';
import type { Client } from '@/types';
import { useQuery } from '@tanstack/react-query';

type ClientsViewProps = {
  clients: Client[];
};

export default function ClientsView({ clients }: ClientsViewProps) {
  const {
    data: invoices = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices,
  });

  let content;
  if (isPending) {
    content = <div>Loading</div>;
  } else if (error) {
    content = (
      <p role="alert" className="mt-4 text-sm text-red-600">
        {error.message}
      </p>
    );
  } else {
    content = (
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
    );
  }

  return <div>{content}</div>;
}
