import { ShieldCheck } from 'lucide-react';

export function TrustBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
      <ShieldCheck aria-hidden="true" className="h-4 w-4 text-accent" />
      {label}
    </span>
  );
}
