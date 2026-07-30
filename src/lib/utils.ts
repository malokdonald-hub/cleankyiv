import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats raw user input into the Ukrainian phone mask: +38 (0XX) XXX-XX-XX
 * Accepts pasted values with or without the country code.
 */
export function formatPhone(input: string): string {
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('380')) digits = digits.slice(2);
  else if (digits.startsWith('38')) digits = digits.slice(2);
  if (digits.length > 0 && digits[0] !== '0') digits = `0${digits}`;
  digits = digits.slice(0, 10);

  if (digits.length === 0) return '';

  let out = `+38 (${digits.slice(0, 3)}`;
  if (digits.length >= 3) out += ')';
  if (digits.length > 3) out += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`;
  return out;
}

export function formatPrice(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'ru' ? 'ru-UA' : 'uk-UA').format(Math.round(value));
}

/** Replaces {key} placeholders in a dictionary string. */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
