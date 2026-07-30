'use client';

import { useMemo, useState } from 'react';
import { Calculator as CalculatorIcon, Check } from 'lucide-react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ButtonLink } from '@/components/ui/Button';
import {
  ADDON_KEYS,
  ADDON_PRICES,
  AREA,
  INITIAL_CALCULATOR,
  PRICING_RATES,
  SECTION_IDS,
  SERVICE_TYPES,
} from '@/lib/constants';
import type { AddonKey, CalculatorState, ServiceType } from '@/lib/types';
import { cn, formatPrice } from '@/lib/utils';

export function Calculator() {
  const { t, locale } = useTranslation();
  const [state, setState] = useState<CalculatorState>(INITIAL_CALCULATOR);

  const total = useMemo(() => {
    const base = state.area * PRICING_RATES[state.type];
    const addons = ADDON_KEYS.reduce(
      (sum, key) => (state.addons[key] ? sum + ADDON_PRICES[key] : sum),
      0,
    );
    return base + addons;
  }, [state]);

  const setType = (type: ServiceType) => setState((prev) => ({ ...prev, type }));
  const setArea = (area: number) => setState((prev) => ({ ...prev, area }));
  const toggleAddon = (key: AddonKey) =>
    setState((prev) => ({ ...prev, addons: { ...prev.addons, [key]: !prev.addons[key] } }));

  return (
    <section id={SECTION_IDS.calculator} className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title={t('calculator.h2')} subtitle={t('calculator.subtitle')} />

        <div className="mx-auto grid max-w-5xl gap-8 rounded-xl border border-border bg-surface p-6 shadow-card md:p-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <fieldset>
              <legend className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-text-secondary">
                {t('calculator.type_label')}
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {SERVICE_TYPES.map((type) => {
                  const isActive = state.type === type;
                  return (
                    <label
                      key={type}
                      className={cn(
                        'flex cursor-pointer flex-col gap-1 rounded-lg border-2 p-4 transition-colors',
                        'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
                        isActive
                          ? 'border-primary bg-primary-light'
                          : 'border-border hover:border-primary/40',
                      )}
                    >
                      <input
                        type="radio"
                        name="cleaning-type"
                        value={type}
                        checked={isActive}
                        onChange={() => setType(type)}
                        className="sr-only"
                      />
                      <span className="font-heading text-sm font-semibold text-text-primary">
                        {t(`calculator.type_${type}`)}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {PRICING_RATES[type]} {t('common.currency')}/{t('calculator.area_unit')}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="calc-area"
                className="mb-3 block font-heading text-sm font-semibold uppercase tracking-wide text-text-secondary"
              >
                {t('calculator.area_label')}
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="calc-area"
                  type="range"
                  min={AREA.min}
                  max={AREA.max}
                  step={AREA.step}
                  value={state.area}
                  onChange={(event) => setArea(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
                <output
                  htmlFor="calc-area"
                  className="w-24 shrink-0 rounded-lg bg-primary-light px-3 py-2 text-center font-heading font-semibold text-primary"
                >
                  {state.area} {t('calculator.area_unit')}
                </output>
              </div>
            </div>

            <fieldset>
              <legend className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-text-secondary">
                {t('calculator.addons_label')}
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {ADDON_KEYS.map((key) => {
                  const isActive = state.addons[key];
                  return (
                    <label
                      key={key}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors',
                        'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
                        isActive
                          ? 'border-primary bg-primary-light'
                          : 'border-border hover:border-primary/40',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => toggleAddon(key)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
                          isActive ? 'border-primary bg-primary text-white' : 'border-border',
                        )}
                      >
                        {isActive ? <Check className="h-3.5 w-3.5" /> : null}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-medium text-text-primary">
                          {t(`calculator.addon_${key}`)}
                        </span>
                        <span className="text-xs text-text-secondary">
                          +{ADDON_PRICES[key]} {t('common.currency')}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col justify-center rounded-xl bg-text-primary p-6 text-white md:p-8">
            <span className="mb-2 flex items-center gap-2 text-sm text-white/70">
              <CalculatorIcon aria-hidden="true" className="h-4 w-4" />
              {t('calculator.total_label')}
            </span>
            <p aria-live="polite" className="font-heading text-4xl font-bold md:text-5xl">
              {formatPrice(total, locale)}{' '}
              <span className="text-2xl font-semibold text-accent md:text-3xl">
                {t('common.currency')}
              </span>
            </p>
            <p className="mt-4 text-xs leading-relaxed text-white/60">
              {t('calculator.total_note')}
            </p>
            <ButtonLink
              href={`#${SECTION_IDS.leadForm}`}
              variant="accent"
              size="lg"
              className="mt-6 w-full"
            >
              {t('calculator.button')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
