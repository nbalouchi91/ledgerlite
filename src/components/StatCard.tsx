type StatCardProps = {
  label: string;
  value: string;
  change?: number; // the ? means optional
};

export function StatCard({ label, value, change }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {change !== undefined && (
        <p className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
          {change >= 0 ? '+' : ''}
          {change}%
        </p>
      )}
    </div>
  );
}
