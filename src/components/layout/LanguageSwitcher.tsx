'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeNames, isLocale } from '@/i18n/config';
import { useTranslation } from '@/i18n/TranslationProvider';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const { locale, t } = useTranslation();

  const buildHref = (target: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && isLocale(segments[0])) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    return `/${segments.join('/')}`;
  };

  return (
    <div
      className={cn('inline-flex items-center rounded-lg border border-border/60 p-0.5', className)}
      role="group"
      aria-label={t('common.lang_switch')}
    >
      {locales.map((item) => {
        const isActive = item === locale;
        return (
          <Link
            key={item}
            href={buildHref(item)}
            hrefLang={item}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              isActive
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-primary-light hover:text-primary',
            )}
          >
            {localeNames[item]}
          </Link>
        );
      })}
    </div>
  );
}
