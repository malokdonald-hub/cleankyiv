import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import '../globals.css';

import { getDictionary, isLocale, locales, type Locale } from '@/i18n/config';
import { TranslationProvider } from '@/i18n/TranslationProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingContacts } from '@/components/layout/FloatingContacts';
import { faqJsonLd, localBusinessJsonLd } from '@/lib/seo';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${params.locale}`,
      languages: { uk: '/uk', ru: '/ru' },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: params.locale === 'ru' ? 'ru_UA' : 'uk_UA',
      type: 'website',
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(locale)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(locale)) }}
        />

        <TranslationProvider locale={locale} dict={dict}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingContacts />
          <Toaster richColors position="top-center" closeButton />
        </TranslationProvider>
      </body>
    </html>
  );
}
