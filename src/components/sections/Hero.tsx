'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/i18n/TranslationProvider';
import { ButtonLink } from '@/components/ui/Button';
import { TrustBadge } from '@/components/shared/TrustBadge';
import { IMAGES, SECTION_IDS } from '@/lib/constants';

export function Hero() {
  const { t, tList } = useTranslation();
  const triggers = tList<string>('hero.triggers');
  const reduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: 'easeOut' as const },
        };

  return (
    <section id={SECTION_IDS.hero} className="relative isolate min-h-[620px] overflow-hidden">
      <Image
        src={IMAGES.hero}
        alt={t('hero.alt')}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
        style={{ objectPosition: 'center 20%' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/75 to-black/50"
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 md:pb-28 md:pt-40 lg:px-8 lg:pb-36 lg:pt-48">
        <div className="max-w-2xl">
          <motion.h1
            {...fade(0)}
            className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl lg:text-[3.25rem]"
          >
            {t('hero.h1')}
          </motion.h1>

          <motion.p {...fade(0.15)} className="mt-6 text-base leading-relaxed text-white md:text-lg">
            {t('hero.subtitle')}
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink
              href={`#${SECTION_IDS.calculator}`}
              variant="accent"
              size="lg"
              className="animate-pulse-cta"
            >
              {t('hero.cta1')}
            </ButtonLink>
            <ButtonLink href={`#${SECTION_IDS.leadForm}`} variant="outline" size="lg">
              {t('hero.cta2')}
            </ButtonLink>
          </motion.div>

          <motion.ul {...fade(0.45)} className="mt-10 flex flex-wrap gap-3">
            {triggers.map((trigger) => (
              <li key={trigger}>
                <TrustBadge label={trigger} />
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
