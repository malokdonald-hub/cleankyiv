'use client';

import { useEffect, useState } from 'react';
import { Menu, Phone, Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACTS, SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: `#${SECTION_IDS.services}`, label: t('nav.services') },
    { href: `#${SECTION_IDS.process}`, label: t('nav.process') },
    { href: `#${SECTION_IDS.advantages}`, label: t('nav.advantages') },
    { href: `#${SECTION_IDS.calculator}`, label: t('nav.calculator') },
    { href: `#${SECTION_IDS.reviews}`, label: t('nav.reviews') },
    { href: `#${SECTION_IDS.faq}`, label: t('nav.faq') },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {t('common.skip_to_content')}
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          'border-b backdrop-blur-[12px]',
          scrolled
            ? 'border-border bg-surface/85 shadow-card'
            : 'border-transparent bg-surface/40 lg:bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 lg:px-8">
          <a
            href={`#${SECTION_IDS.hero}`}
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <Sparkles aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  'font-heading text-lg font-bold',
                  scrolled ? 'text-text-primary' : 'text-text-primary lg:text-white',
                )}
              >
                {t('common.brand')}
              </span>
              <span
                className={cn(
                  'text-[11px]',
                  scrolled ? 'text-text-secondary' : 'text-text-secondary lg:text-white/80',
                )}
              >
                {t('common.brand_tagline')}
              </span>
            </span>
          </a>

          <nav aria-label={t('nav.services')} className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  scrolled
                    ? 'text-text-secondary hover:bg-primary-light hover:text-primary'
                    : 'text-white/90 hover:bg-white/15 hover:text-white',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher className={cn(!scrolled && 'lg:border-white/40')} />
            <ButtonLink
              href={CONTACTS.phoneHref}
              size="sm"
              className="hidden md:inline-flex"
              aria-label={`${t('common.call_us')} ${CONTACTS.phoneDisplay}`}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              <span className="hidden xl:inline">{CONTACTS.phoneDisplay}</span>
              <span className="xl:hidden">{t('common.call_us')}</span>
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t('common.menu_open')}
              aria-expanded={menuOpen}
              className={cn(
                'rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden',
                scrolled ? 'text-text-primary hover:bg-primary-light' : 'text-text-primary',
              )}
            >
              <Menu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
}
