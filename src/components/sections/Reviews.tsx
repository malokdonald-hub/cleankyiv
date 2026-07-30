'use client';

import { useState } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SECTION_IDS } from '@/lib/constants';
import type { ReviewItem } from '@/lib/types';
import { cn } from '@/lib/utils';

const SWIPE_THRESHOLD = 60;

export function Reviews() {
  const { t, tList } = useTranslation();
  const items = tList<ReviewItem>('reviews.items');
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const count = items.length;
  const goTo = (next: number) => setIndex(((next % count) + count) % count);

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1);
    else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1);
  };

  if (count === 0) return null;

  return (
    <section id={SECTION_IDS.reviews} className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title={t('reviews.h2')} />

        <div className="relative mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-xl">
            <motion.div
              className="flex cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: 'tween', duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
            >
              {items.map((review, itemIndex) => (
                <article
                  key={review.name}
                  aria-hidden={itemIndex !== index}
                  className="w-full shrink-0 px-1"
                >
                  <div className="h-full rounded-xl border border-border bg-background p-6 shadow-card md:p-10">
                    <Quote aria-hidden="true" className="mb-4 h-8 w-8 text-primary/30" />
                    <div className="mb-4 flex gap-1" aria-label="5/5">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          aria-hidden="true"
                          className="h-4 w-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <p className="mb-6 select-none text-base leading-relaxed text-text-primary md:text-lg">
                      {review.text}
                    </p>
                    <footer>
                      <p className="font-heading font-semibold text-text-primary">{review.name}</p>
                      <p className="text-sm text-text-secondary">{review.loc}</p>
                    </footer>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={t('reviews.prev')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {items.map((review, dotIndex) => (
                <button
                  key={review.name}
                  type="button"
                  onClick={() => goTo(dotIndex)}
                  aria-label={t('reviews.goto', { n: dotIndex + 1 })}
                  aria-current={dotIndex === index ? 'true' : undefined}
                  className={cn(
                    'h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    dotIndex === index ? 'w-8 bg-primary' : 'w-2.5 bg-border hover:bg-primary/40',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={t('reviews.next')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
