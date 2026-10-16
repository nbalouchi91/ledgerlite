import { clients, invoices } from '@/src/lib/sampleData';
import InvoicesView from '@/src/components/InvoicesView';

export default function InvoicesPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">Invoices</h1>

      <InvoicesView clients={clients} initialInvoices={invoices} />
    </main>
  );
}
