'use server';

import { leadSchema } from '@/lib/validations';
import type { FormState } from '@/lib/types';

/**
 * Server Action: validates the lead, drops honeypot hits, forwards to the webhook.
 * Returned messages are diagnostic — the UI shows its own localized toast.
 */
export async function submitLead(payload: unknown): Promise<FormState> {
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? 'Validation failed.',
    };
  }

  const { company, ...lead } = parsed.data;

  // Honeypot filled → a bot. Report success so it stops retrying, but send nothing.
  if (company && company.trim() !== '') {
    return { status: 'success', message: null };
  }

  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('NEXT_PUBLIC_WEBHOOK_URL is not set — the lead was not forwarded.', lead);
    return { status: 'error', message: 'Webhook URL is not configured.' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...lead,
        source: 'cleankyiv-landing',
        submittedAt: new Date().toISOString(),
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return { status: 'error', message: `Webhook responded with ${response.status}.` };
    }

    return { status: 'success', message: null };
  } catch (error) {
    console.error('Lead webhook request failed:', error);
    return { status: 'error', message: 'Network error while sending the lead.' };
  }
}
