'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/i18n/TranslationProvider';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SECTION_IDS } from '@/lib/constants';
import type { ProcessStep } from '@/lib/types';

export function Process() {
  const { t, tList } = useTranslation();
  const steps = tList<ProcessStep>('process.steps');
  const reduceMotion = useReducedMotion();

  return (
    <section id={SECTION_IDS.process} className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title={t('process.h2')} />

        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Dashed connector — decorative, desktop only */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-primary/30 md:block"
          />

          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              className="relative"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.1 }}
            >
              <span className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary font-heading text-xl font-bold text-white ring-8 ring-surface">
                {index + 1}
              </span>
              <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
