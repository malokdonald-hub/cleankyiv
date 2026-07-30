'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CheckCircle2, Send } from 'lucide-react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { submitLead } from '@/app/actions/lead';
import { LEAD_SERVICES, SECTION_IDS } from '@/lib/constants';
import { createLeadSchema, type LeadFormValues } from '@/lib/validations';
import type { FormState } from '@/lib/types';
import { formatPhone } from '@/lib/utils';

export function LeadForm() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState<FormState>({ status: 'idle', message: null });

  const schema = useMemo(
    () =>
      createLeadSchema({
        nameMin: t('errors.name_min'),
        nameMax: t('errors.name_max'),
        phoneInvalid: t('errors.phone_invalid'),
        serviceRequired: t('errors.service_required'),
        agreementRequired: t('errors.agreement_required'),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { name: '', phone: '', serviceType: '', agreement: false, company: '' },
  });

  const phoneField = register('phone');

  const onSubmit = async (values: LeadFormValues) => {
    setFormState({ status: 'submitting', message: null });
    const result = await submitLead(values);

    if (result.status === 'success') {
      setFormState({ status: 'success', message: null });
      toast.success(t('lead_form.toast_success'));
      reset();
    } else {
      setFormState({ status: 'error', message: t('lead_form.toast_error') });
      toast.error(t('lead_form.toast_error'));
    }
  };

  const isSubmitting = formState.status === 'submitting';

  return (
    <section id={SECTION_IDS.leadForm} className="bg-primary-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title={t('lead_form.h2')} subtitle={t('lead_form.subtitle')} />

        <div className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-6 shadow-card md:p-10">
          {formState.status === 'success' ? (
            <div className="py-8 text-center">
              <CheckCircle2 aria-hidden="true" className="mx-auto mb-4 h-14 w-14 text-primary" />
              <h3 className="mb-2 font-heading text-xl font-bold text-text-primary">
                {t('lead_form.success_title')}
              </h3>
              <p className="mb-6 text-text-secondary">{t('lead_form.success_text')}</p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setFormState({ status: 'idle', message: null })}
              >
                {t('lead_form.success_again')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
              {/* Honeypot: hidden from users and screen readers, visible to naive bots. */}
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('company')}
                />
              </div>

              <Input
                label={t('lead_form.label_name')}
                placeholder={t('lead_form.ph_name')}
                autoComplete="name"
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label={t('lead_form.label_phone')}
                placeholder={t('lead_form.ph_phone')}
                inputMode="tel"
                autoComplete="tel"
                error={errors.phone?.message}
                {...phoneField}
                onChange={(event) => {
                  event.target.value = formatPhone(event.target.value);
                  void phoneField.onChange(event);
                }}
              />

              <Select
                label={t('lead_form.label_service')}
                error={errors.serviceType?.message}
                defaultValue=""
                {...register('serviceType')}
              >
                <option value="" disabled>
                  {t('lead_form.ph_service')}
                </option>
                {LEAD_SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service === 'chem'
                      ? t('services.items.3.title')
                      : t(`calculator.type_${service}`)}
                  </option>
                ))}
              </Select>

              <Checkbox
                label={t('lead_form.checkbox')}
                error={errors.agreement?.message}
                {...register('agreement')}
              />

              <Button
                type="submit"
                variant="accent"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                <Send aria-hidden="true" className="h-5 w-5" />
                {isSubmitting ? t('lead_form.button_loading') : t('lead_form.button')}
              </Button>

              <details className="text-xs text-text-secondary">
                <summary className="cursor-pointer font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {t('lead_form.policy_title')}
                </summary>
                <p className="mt-2 leading-relaxed">{t('lead_form.policy_text')}</p>
              </details>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
