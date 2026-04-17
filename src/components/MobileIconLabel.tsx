import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileIconLabelProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

const MobileIconLabel = ({ icon: Icon, label, className }: MobileIconLabelProps) => {
  return (
    <div
      className={cn(
        'flex min-h-10 items-center justify-center rounded-md border bg-slate-50 px-3 text-sm text-slate-500',
        className,
      )}
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="sr-only sm:not-sr-only sm:ml-2">{label}</span>
    </div>
  );
};

export default MobileIconLabel;
