import ClientsView from '@/components/ClientsView';

import { clients } from '@/lib/sampleData';

export default function ClientsPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">Clients</h1>
      <ClientsView clients={clients} />
    </main>
  );
}
