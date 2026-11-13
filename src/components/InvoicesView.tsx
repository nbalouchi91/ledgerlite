'use client';
import {
  formatCurrency,
  formatDate,
  getClientName,
  getOverdueInvoices,
} from '@/lib/invoiceUtils';
import NewInvoiceForm from './NewInvoiceForm';
import StatusBadge from './StatusBadge';
import type { Client, NewInvoice } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createInvoice, fetchInvoices } from '@/lib/api';

type InvoicesViewProps = {
  clients: Client[];
};

export default function InvoicesView({ clients }: InvoicesViewProps) {
  const queryClient = useQueryClient();
  const {
    data: invoices = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices,
  });

  const createMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['invoices'] }),
  });

  const overdueInvoices = getOverdueInvoices(invoices);

  async function handleAddInvoice(
    newInvoice: NewInvoice,
  ): Promise<string | null> {
    try {
      await createMutation.mutateAsync(newInvoice);
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : 'Something went wrong.';
    }
  }

  let content;

  if (isPending) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = (
      <p role="alert" className="mt-4 text-sm text-red-600">
        {error.message}
      </p>
    );
  } else {
    content = (
      <>
        <p className="mt-2 text-gray-100">
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
                  <td className="py-2 px-3">{invoice.id.slice(0, 8)}</td>
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
      </>
    );
  }

  return (
    <div>
      <NewInvoiceForm clients={clients} onAdd={handleAddInvoice} />

      {content}
    </div>
  );
}
