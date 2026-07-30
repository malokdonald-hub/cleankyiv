'use client';

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent, type TouchEvent } from 'react';
import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { IMAGES, SECTION_IDS } from '@/lib/constants';

const STEP = 5;
const BIG_STEP = 20;

export function BeforeAfter() {
  const { t } = useTranslation();
  const [value, setValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const clamp = (next: number) => Math.min(100, Math.max(0, next));

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setValue(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  // Touch event handlers for mobile devices.
  // Note: React attaches touchstart/touchmove listeners as passive by default,
  // so event.preventDefault() would throw/no-op here. Page-scroll is instead
  // blocked declaratively via the `touch-action: none` CSS on the container.
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    dragging.current = true;
    updateFromClientX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!dragging.current || event.touches.length !== 1) return;
    updateFromClientX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    dragging.current = false;
  };

  // Pointer event handlers (mouse + touch fallback)
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    // Only handle primary pointer (not right click, etc.)
    if (event.isPrimary) {
      dragging.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      updateFromClientX(event.clientX);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const actions: Record<string, number> = {
      ArrowLeft: -STEP,
      ArrowDown: -STEP,
      ArrowRight: STEP,
      ArrowUp: STEP,
      PageDown: -BIG_STEP,
      PageUp: BIG_STEP,
    };

    if (event.key in actions) {
      event.preventDefault();
      setValue((current) => clamp(current + actions[event.key]));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setValue(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setValue(100);
    }
  };

  const rounded = Math.round(value);

  return (
    <section id={SECTION_IDS.beforeAfter} className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title={t('before_after.h2')} subtitle={t('before_after.text')} />

        <div
          ref={containerRef}
          // Touch event handlers for mobile
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          // Pointer event handlers (mouse + touch fallback)
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative mx-auto aspect-[16/10] w-full max-w-4xl cursor-ew-resize select-none overflow-hidden rounded-xl shadow-card [touch-action:none]"
        >
          {/* Base layer: "before" (dirty) */}
          <Image
            src={IMAGES.after}
            alt={t('before_after.alt_before')}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="pointer-events-none object-cover"
          />

          {/* Clipped layer: "after" (clean) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
          >
            <Image
              src={IMAGES.before}
              alt={t('before_after.alt_after')}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="pointer-events-none object-cover"
            />
          </div>

          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-text-primary/75 px-3 py-1 text-xs font-semibold text-white">
            {t('before_after.label_before')}
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white">
            {t('before_after.label_after')}
          </span>

          {/* Handle */}
          <div
            role="slider"
            tabIndex={0}
            aria-label={t('before_after.slider_label')}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={rounded}
            aria-valuetext={t('before_after.slider_valuetext', { value: rounded })}
            aria-orientation="horizontal"
            onKeyDown={handleKeyDown}
            className="absolute inset-y-0 z-10 flex w-12 -translate-x-1/2 cursor-ew-resize items-center justify-center focus-visible:outline-none"
            style={{ left: `${value}%` }}
          >
            <span aria-hidden="true" className="absolute inset-y-0 w-1 bg-white shadow-card" />
            <span
              aria-hidden="true"
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-card-hover ring-offset-2 transition-transform"
            >
              <MoveHorizontal className="h-6 w-6" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
