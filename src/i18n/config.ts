import ukDict from './uk.json';
import ruDict from './ru.json';

export const locales = ['ua', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ua';

export type Dictionary = typeof ukDict;

const dictionaries: Record<Locale, Dictionary> = {
  ua: ukDict,
  ru: ruDict as Dictionary,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const localeNames: Record<Locale, string> = {
  ua: 'UA',
  ru: 'RU',
};
