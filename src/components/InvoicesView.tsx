'use client';
import { useState } from 'react';
import {
  formatCurrency,
  formatDate,
  getClientName,
  getOverdueInvoices,
} from '@/lib/invoiceUtils';
import NewInvoiceForm from './NewInvoiceForm';
import StatusBadge from './StatusBadge';
import type { Client, Invoice } from '@/types';

type InvoicesViewProps = {
  initialInvoices: Invoice[];
  clients: Client[];
};

export default function InvoicesView({
  initialInvoices,
  clients,
}: InvoicesViewProps) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  const overdueInvoices = getOverdueInvoices(invoices);

  function handleAddInvoice(invoice: Invoice) {
    setInvoices((prevInvoices) => [...prevInvoices, invoice]);
  }

  return (
    <div>
      <NewInvoiceForm clients={clients} onAdd={handleAddInvoice} />

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
    </div>
  );
}
