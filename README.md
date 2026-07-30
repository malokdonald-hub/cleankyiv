# CleanKyiv — лендинг клінінгової компанії

Next.js 14 (App Router) + TypeScript + Tailwind. Двомовний: `uk` (за замовчуванням) та `ru`.

## Запуск

```bash
npm install
cp .env.local.example .env.local   # вкажіть свій webhook
npm run dev                        # http://localhost:3000 → /uk
```

Перевірка типів без збірки: `npm run typecheck`.

## Структура

```
src/
├── app/
│   ├── [locale]/        layout.tsx (Header/Footer/Toaster/JSON-LD), page.tsx (усі секції)
│   ├── actions/lead.ts  Server Action: валідація + honeypot + webhook
│   ├── api/lead/        REST-аналог тієї ж логіки
│   └── globals.css
├── components/  layout/ · sections/ · ui/ · shared/
├── i18n/        config.ts · TranslationProvider.tsx · uk.json · ru.json
├── lib/         types · constants · utils · validations · seo
└── middleware.ts        / → /uk
```

## Що треба замінити перед запуском

1. `NEXT_PUBLIC_WEBHOOK_URL` у `.env.local` — інакше форма повертає помилку.
2. `CONTACTS` у `src/lib/constants.ts` — телефон, пошта, Telegram і Viber зараз плейсхолдери.
3. `IMAGES` у `src/lib/constants.ts` — фото з Unsplash варто замінити на реальні роботи.
4. Рейтинг у `src/lib/seo.ts` (4.8 / 120 відгуків) — розмітка має відповідати дійсності, інакше Google накладає санкції.

## Ціноутворення

`total = area × typeRate + Σ addons`, тарифи та надбавки — у `src/lib/constants.ts`
(support 40, general 80, repair 120 грн/м²; вікна 400, диван 800, холодильник 300 грн).
