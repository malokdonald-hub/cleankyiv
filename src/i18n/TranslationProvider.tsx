'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Dictionary, Locale } from './config';
import { interpolate } from '@/lib/utils';

interface TranslationContextValue {
  locale: Locale;
  dict: Dictionary;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

function resolve(dict: Dictionary, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined,
      dict,
    );
}

export function TranslationProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, dict }), [locale, dict]);
  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error('useTranslation must be used inside <TranslationProvider>.');
  }
  const { dict, locale } = ctx;

  /** Returns a string from the dictionary. Falls back to the key path if missing. */
  const t = (path: string, vars?: Record<string, string | number>): string => {
    const value = resolve(dict, path);
    if (typeof value !== 'string') return path;
    return vars ? interpolate(value, vars) : value;
  };

  /** Returns an array from the dictionary (services, reviews, FAQ items, …). */
  const tList = <T,>(path: string): T[] => {
    const value = resolve(dict, path);
    return Array.isArray(value) ? (value as T[]) : [];
  };

  return { t, tList, locale, dict };
}
