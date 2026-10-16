'use client';

import { useState } from 'react';
import type { Client, Invoice } from '@/src/types';

type NewInvoiceFormProps = {
  clients: Client[];
  onAdd: (invoice: Invoice) => void;
};

const fieldClass =
  'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30';
const labelClass = 'block text-sm font-medium text-gray-100';

export default function NewInvoiceForm({
  clients,
  onAdd,
}: NewInvoiceFormProps) {
  const [clientId, setClientId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (clientId === '') {
      setError('Please select a client.');
      return;
    }

    const cents = Math.round(parseFloat(amount) * 100);
    if (Number.isNaN(cents) || cents <= 0) {
      setError('Enter an amount greater than 0.');
      return;
    }
    if (dueDate === '') {
      setError('Please select a due date.');
      return;
    }

    const newInvoice: Invoice = {
      id: crypto.randomUUID(),
      clientId,
      amountCents: cents,
      status: 'draft',
      issuedDate: new Date().toLocaleDateString('en-CA'),
      dueDate: dueDate,
    };
    onAdd(newInvoice);
    setClientId('');
    setAmount('');
    setDueDate('');
    setError('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="New invoice"
      className="grid gap-4 rounded-xl border border-gray-200 p-4 shadow-sm sm:grid-cols-4 sm:items-end"
    >
      <div>
        <label htmlFor="client" className={labelClass}>
          Client
        </label>
        <select
          id="client"
          name="client"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className={fieldClass}
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="amount" className={labelClass}>
          Amount (CAD)
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="date" className={labelClass}>
          Due date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={fieldClass}
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Add invoice
      </button>
      {error && (
        <p role="alert" className="text-sm text-red-600 sm:col-span-4">
          {error}
        </p>
      )}
    </form>
  );
}
