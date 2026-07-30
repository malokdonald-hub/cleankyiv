'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AccordionItem } from '@/components/ui/Accordion';
import { SECTION_IDS } from '@/lib/constants';
import type { FaqItem } from '@/lib/types';

export function FAQ() {
  const { t, tList } = useTranslation();
  const items = tList<FaqItem>('faq.items');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={SECTION_IDS.faq} className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title={t('faq.h2')} />

        <div className="mx-auto max-w-3xl space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={item.q}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
