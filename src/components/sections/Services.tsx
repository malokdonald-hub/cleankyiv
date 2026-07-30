'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Brush, Hammer, Sofa, Sparkles, type LucideIcon } from 'lucide-react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Card } from '@/components/ui/Card';
import { SECTION_IDS } from '@/lib/constants';
import type { ServiceItem } from '@/lib/types';

const ICONS: LucideIcon[] = [Sparkles, Brush, Hammer, Sofa];

export function Services() {
  const { t, tList } = useTranslation();
  const items = tList<ServiceItem>('services.items');
  const reduceMotion = useReducedMotion();

  return (
    <section id={SECTION_IDS.services} className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title={t('services.h2')} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
              >
                <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="mb-3 font-heading text-lg font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
