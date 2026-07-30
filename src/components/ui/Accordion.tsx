'use client';

import { useId, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItemProps {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-heading text-base font-semibold text-text-primary transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:text-lg"
        >
          <span>{question}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-5 w-5 shrink-0 text-primary transition-transform duration-300',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-text-secondary">{answer}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
