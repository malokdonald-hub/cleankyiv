'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Leaf, ShieldCheck, Wrench, type LucideIcon } from 'lucide-react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { IMAGES, SECTION_IDS } from '@/lib/constants';
import type { AdvantageItem } from '@/lib/types';

const ICONS: LucideIcon[] = [Leaf, ShieldCheck, Wrench];

export function Advantages() {
  const { t, tList } = useTranslation();
  const items = tList<AdvantageItem>('advantages.items');
  const reduceMotion = useReducedMotion();

  return (
    <section id={SECTION_IDS.advantages} className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-1/2">
            <Image
              src={IMAGES.advantages}
              alt={t('advantages.alt')}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full rounded-xl object-cover shadow-card"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <SectionHeader title={t('advantages.h2')} align="left" className="mb-8" />

            <ul className="space-y-8">
              {items.map((item, index) => {
                const Icon = ICONS[index % ICONS.length];
                return (
                  <motion.li
                    key={item.title}
                    className="flex gap-4"
                    initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.5,
                      delay: reduceMotion ? 0 : index * 0.1,
                    }}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary">{item.desc}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
