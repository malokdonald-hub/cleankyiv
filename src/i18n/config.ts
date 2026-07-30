import uk from './uk.json';
import ru from './ru.json';

export const locales = ['uk', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'uk';

export type Dictionary = typeof uk;

const dictionaries: Record<Locale, Dictionary> = {
  uk,
  ru: ru as Dictionary,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const localeNames: Record<Locale, string> = {
  uk: 'UA',
  ru: 'RU',
};
