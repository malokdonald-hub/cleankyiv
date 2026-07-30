import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/config';
import { CONTACTS, IMAGES } from './constants';

export function localBusinessJsonLd(locale: Locale) {
  const isRu = locale === 'ru';
  return {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    name: 'CleanKyiv',
    image: IMAGES.hero,
    telephone: '+380971234567',
    address: {
      '@type': 'PostalAddress',
      addressLocality: isRu ? 'Киев' : 'Kyiv',
      streetAddress: isRu ? 'улица Крещатик, 22' : 'Khreshchatyk, 22',
      addressCountry: 'UA',
    },
    email: CONTACTS.email,
    priceRange: '$$',
    openingHours: 'Mo-Su 00:00-23:59',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '120',
    },
  };
}

export function faqJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
