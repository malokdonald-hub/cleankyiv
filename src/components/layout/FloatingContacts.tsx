'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Phone, Send, X } from 'lucide-react';
import { useTranslation } from '@/i18n/TranslationProvider';
import { CONTACTS } from '@/lib/constants';

export function FloatingContacts() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const items = [
    { href: CONTACTS.telegram, label: 'Telegram', Icon: Send, className: 'bg-[#229ED9]' },
    { href: CONTACTS.viber, label: 'Viber', Icon: MessageCircle, className: 'bg-[#7360F2]' },
    { href: CONTACTS.phoneHref, label: t('common.call_us'), Icon: Phone, className: 'bg-primary' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open
          ? items.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={item.label}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.85 }}
                transition={{ duration: reduceMotion ? 0 : 0.18, delay: reduceMotion ? 0 : index * 0.05 }}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-card-hover transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${item.className}`}
              >
                <item.Icon aria-hidden="true" className="h-6 w-6" />
              </motion.a>
            ))
          : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? t('common.contacts_close') : t('common.contacts_open')}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-card-hover transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
