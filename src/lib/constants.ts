import type { AddonPrices, PricingRates, ServiceType, AddonKey } from './types';

export const PRICING_RATES: PricingRates = {
  support: 40,
  general: 80,
  repair: 120,
};

export const ADDON_PRICES: AddonPrices = {
  windows: 400,
  sofa: 800,
  fridge: 300,
};

export const SERVICE_TYPES: ServiceType[] = ['support', 'general', 'repair'];
export const ADDON_KEYS: AddonKey[] = ['windows', 'sofa', 'fridge'];

/** Values accepted by the lead form's service select. */
export const LEAD_SERVICES = ['support', 'general', 'repair', 'chem'] as const;
export type LeadService = (typeof LEAD_SERVICES)[number];

export const AREA = { min: 20, max: 300, step: 5, initial: 50 } as const;

export const INITIAL_CALCULATOR = {
  type: 'support' as ServiceType,
  area: AREA.initial,
  addons: { windows: false, sofa: false, fridge: false },
};

export const CONTACTS = {
  phoneDisplay: '+38 (097) 123-45-67',
  phoneHref: 'tel:+380971234567',
  email: 'info@cleankyiv.ua',
  // Placeholder URLs — replace with the real accounts before launch.
  telegram: 'https://t.me/cleankyiv',
  viber: 'viber://chat?number=%2B380971234567',
} as const;

export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1920',
  advantages: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800',
  before: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1000',
  after: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000',
} as const;

export const SECTION_IDS = {
  hero: 'hero',
  services: 'services',
  process: 'process',
  advantages: 'advantages',
  beforeAfter: 'before-after',
  calculator: 'calculator',
  reviews: 'reviews',
  faq: 'faq',
  leadForm: 'lead-form',
} as const;
