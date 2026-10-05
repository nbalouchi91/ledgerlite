import { StatCard } from '@/components/StatCard';

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Revenue" value="$12,400" change={8.2} />
        <StatCard label="Overdue invoices" value="7" change={-12} />
        <StatCard label="Clients" value="23" />
      </div>
    </main>
  );
}
