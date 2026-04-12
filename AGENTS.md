# Repository Guidelines

## Project Structure & Module Organization

This is a private Next.js App Router site with TypeScript and `next-intl` localization. Route files live under `src/app/[locale]/`, with pages such as `about`, `contact`, `projects`, `services`, `clients`, and `process`. Shared layout components are in `src/components/layout/`, homepage sections are in `src/components/home/`, and reusable UI pieces are in `src/components/ui/`. Localization setup is in `src/i18n/`, middleware is in `src/middleware.ts`, and translated copy is stored in `messages/en.json` and `messages/ar.json`. Static assets such as `logo.png` and `hero.jpg` belong in `public/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Next.js development server.
- `npm run build`: create a production build and run Next.js validation.
- `npm run start`: serve the production build locally after `npm run build`.
- `npm run lint`: run ESLint using the Next.js core web vitals and TypeScript config.

Use `npm install` to restore dependencies from `package-lock.json`.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow the existing style: 4-space indentation in TS/TSX files, single quotes, semicolons, and PascalCase component filenames such as `HeroSection.tsx` or `ServiceCard.tsx`. Use the `@/*` import alias for `src/*` paths when it keeps imports clearer. Keep route folders lowercase and aligned with localized URLs. Tailwind utility classes are used directly in JSX; prefer existing theme tokens and component patterns before adding new abstractions.

## Testing Guidelines

No dedicated test framework or coverage requirement is currently configured. Before opening a change, run `npm run lint` and `npm run build`. If tests are added later, place them near the code they cover or in a clearly named test directory, use descriptive names such as `ComponentName.test.tsx`, and document the test command in `package.json`.

## Commit & Pull Request Guidelines

Recent history uses short imperative commits, including Conventional Commit-style messages such as `feat: Add initial localized pages...`. Prefer `feat:`, `fix:`, `chore:`, or similarly clear prefixes with a concise summary. Pull requests should include the purpose of the change, affected routes or components, validation performed, and screenshots for visible UI changes. Mention any localization updates when editing `messages/en.json` or `messages/ar.json`.

## Security & Configuration Tips

Do not commit secrets or environment-specific credentials. Keep deployment settings in `netlify.toml` and framework settings in `next.config.ts`. When adding new public assets, use stable filenames and verify they load from `/public` paths in both English and Arabic routes.
