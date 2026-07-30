export type ServiceType = 'support' | 'general' | 'repair';
export type AddonKey = 'windows' | 'sofa' | 'fridge';

export interface CalculatorState {
  type: ServiceType;
  area: number;
  addons: { windows: boolean; sofa: boolean; fridge: boolean };
}

export interface PricingRates {
  support: number;
  general: number;
  repair: number;
}

export interface AddonPrices {
  windows: number;
  sofa: number;
  fridge: number;
}

export interface LeadFormData {
  name: string;
  phone: string;
  serviceType: string;
  agreement: boolean;
}

export interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string | null;
}

export interface ServiceItem {
  title: string;
  desc: string;
}

export interface ProcessStep {
  title: string;
  desc: string;
}

export interface AdvantageItem {
  title: string;
  desc: string;
}

export interface ReviewItem {
  name: string;
  loc: string;
  text: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
