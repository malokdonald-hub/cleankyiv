import { cn } from '@/lib/utils';

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className,
}: {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-10 max-w-3xl md:mb-14',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      <h2 className="font-heading text-2xl font-bold leading-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-base text-text-secondary md:text-lg">{subtitle}</p> : null}
      <span
        aria-hidden="true"
        className={cn('mt-5 block h-1 w-16 rounded-full bg-accent', align === 'center' && 'mx-auto')}
      />
    </div>
  );
}
