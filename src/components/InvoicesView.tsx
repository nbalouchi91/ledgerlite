'use client';
import { useEffect, useState } from 'react';
import {
  formatCurrency,
  formatDate,
  getClientName,
  getOverdueInvoices,
} from '@/lib/invoiceUtils';
import NewInvoiceForm from './NewInvoiceForm';
import StatusBadge from './StatusBadge';
import type { Client, Invoice, NewInvoice } from '@/types';
import { set, z } from 'zod';
import { invoiceSchema } from '@/lib/schemas';

type InvoicesViewProps = {
  clients: Client[];
};

export default function InvoicesView({ clients }: InvoicesViewProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const overdueInvoices = getOverdueInvoices(invoices);

  async function handleAddInvoice(
    newInvoice: NewInvoice,
  ): Promise<string | null> {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInvoice),
      });

      const body = await response.json();

      if (!response.ok) {
        return typeof body.error === 'string'
          ? body.error
          : 'Something went wrong.';
      }
      const created = invoiceSchema.parse(body);
      setInvoices((prev) => [...prev, created]);

      return null;
    } catch {
      return 'Could not reach the server.';
    }
  }

  useEffect(() => {
    // 1. Create an instance of AbortController
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        // 2. Pass the signal to the fetch options
        const response = await fetch('/api/invoices', { signal });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const result = await response.json();

        setInvoices(z.array(invoiceSchema).parse(result));
      } catch {
        if (!signal.aborted) {
          setError('Could not load invoices.');
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    // 3. Cleanup function to abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, []);

  let content;

  if (loading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = (
      <p role="alert" className="mt-4 text-sm text-red-600">
        {error}
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
