'use client';

import { Clock, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CONTACTS, SECTION_IDS } from '@/lib/constants';
import type { ServiceItem } from '@/lib/types';

export function Footer() {
  const { t, tList } = useTranslation();
  const services = tList<ServiceItem>('services.items');

  return (
    <footer id="contacts" className="bg-text-primary text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                <Sparkles aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="font-heading text-lg font-bold text-white">{t('common.brand')}</span>
            </div>
            <p className="text-sm leading-relaxed">{t('footer.about')}</p>
            <LanguageSwitcher className="mt-6 border-white/20" />
          </div>

          <div>
            <h2 className="mb-4 font-heading text-base font-semibold text-white">
              {t('footer.col_services')}
            </h2>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.title}>
                  <a
                    href={`#${SECTION_IDS.services}`}
                    className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-base font-semibold text-white">
              {t('footer.col_contacts')}
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={CONTACTS.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                  {t('footer.phone')}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACTS.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                  {t('footer.email')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                {t('footer.address')}
              </li>
              <li className="flex items-center gap-3">
                <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                {t('footer.schedule')}
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/60">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
