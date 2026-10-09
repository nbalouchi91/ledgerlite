import { InvoiceStatus } from '@/types';

type StatusBadgeProps = {
  status: InvoiceStatus;
};

const styles: Record<InvoiceStatus, string> = {
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
  sent: 'bg-blue-100 text-blue-800',
  draft: 'bg-gray-100 text-gray-800',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
