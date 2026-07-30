import { z } from 'zod';
import { LEAD_SERVICES } from './constants';

export const PHONE_MASK_REGEX = /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/;

export interface LeadMessages {
  nameMin: string;
  nameMax: string;
  phoneInvalid: string;
  serviceRequired: string;
  agreementRequired: string;
}

/** Server-side fallback messages (default locale: uk). */
export const defaultLeadMessages: LeadMessages = {
  nameMin: "Введіть ім'я — щонайменше 2 символи.",
  nameMax: "Ім'я задовге — максимум 60 символів.",
  phoneInvalid: 'Введіть телефон у форматі +38 (0XX) XXX-XX-XX.',
  serviceRequired: 'Оберіть послугу зі списку.',
  agreementRequired: 'Потрібна згода з політикою конфіденційності.',
};

export function createLeadSchema(m: LeadMessages = defaultLeadMessages) {
  return z.object({
    name: z.string().trim().min(2, m.nameMin).max(60, m.nameMax),
    phone: z.string().regex(PHONE_MASK_REGEX, m.phoneInvalid),
    serviceType: z
      .string()
      .refine((v) => (LEAD_SERVICES as readonly string[]).includes(v), m.serviceRequired),
    agreement: z.boolean().refine((v) => v === true, m.agreementRequired),
    // Honeypot: must stay empty. Never shown to real users.
    company: z.string().optional(),
  });
}

export const leadSchema = createLeadSchema();
export type LeadFormValues = z.infer<typeof leadSchema>;
