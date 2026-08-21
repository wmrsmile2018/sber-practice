# Sber Practice — React Homework

## Быстрый старт

```bash
npm i           # установка зависимостей
npm run start   # dev-сервер (webpack-dev-server)
```

## Команды

| Скрипт | Что делает |
|---|---|
| `npm run start` | dev-сервер (`webpack serve`, env=dev) |
| `npm run build` | production-сборка (`NODE_ENV=production webpack`) |
| `npm run lint` | ESLint + auto-fix (`src/**/*.{js,jsx,ts,tsx}`) |
| `npm run stylelint:fix` | Stylelint + auto-fix (`src/**/*.css`) |
| `npm run format` | Prettier write |
| `npm test` | stylelint:fix → lint → format (последовательно) |
| `npm run commit` | **обязательно:** `npm test` → `cz` (conventional commits) |

**Pre-commit hooks (lint-staged):** CSS → stylelint:fix, JS/TS → lint, остальное → format.

## Архитектура

```
src/
  app/           # App.tsx (layout: Header + Sort + Outlet + Footer + ToastContainer), global styles
  pages/         # Роуты: HomePage, ProductPage, CartPage, ProfilePage, FavoritesPage, SignUp/SignInPage, NotFoundPage
  widgets/       # Крупные блоки: Header, Footer, CardList, ReviewList/ReviewForm
  shared/
    ui/          # Примитивы: Card, Search, Sort, Spinner, LikeButton, Rating, ButtonBack, Logo, ProductCartCounter, CartCounter
    store/       # Redux Toolkit: slices (user, products, cart), root reducer, store, RTK Query API (authApi, productsApi)
    providers/   # router (createBrowserRouter)
    hooks/       # useDebounce, usePagination, useAddToCart
    api/         # ApiServise (custom axios wrapper), HOCs: WithProtection (auth guard), WithQuery (loading/error)
    utils/       # common helpers, getMessageFromError, isLiked
```

**Важные факты:**
- Роутинг — `createBrowserRouter` (react-router-dom v6), конфигурация в `src/shared/providers/router/config/router.tsx`.
- Стейт — Redux Toolkit + RTK Query. Слайсы: `user`, `products`, `cart`.
- API вызывается через RTK Query endpoints + кастомный `ApiServise` (проброшен как thunk extraArgument).
- CSS — **CSS Modules** (`.module.css`). Stylelint enforce BEM-like pattern: `[a-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*(__[a-z0-9]+)*(_[a-z0-9]+)*`.
- Формы: `react-hook-form` + `yup` (валидация в `widgets/SignInForm/utils/validator.ts`, `widgets/SignUpForm/utils/validator.ts`).
- Защита роутов: HOC `WithProtection` из `src/shared/store/HOCs/WithProtection.tsx` (checking accessToken).
- HOC `WithQuery` — обёртка для загрузки/ошибок запросов.
- `.env` — содержит `API_URL` (читается в `customBaseQuery`).

## Конвенции

- **Структура компонентов:** `ui/` + `hooks/` + `utils/` внутри каждого widget/page/shared/ui блока.
- **Imports:** абсолютные от `src/` (tsconfig `include: ["src/**/*"]`).
- **CSS:** только `.module.css`. Не используйте глобальные CSS-файлы для стилей компонентов.
- **Prettier:** single quotes, semi, trailingComma: es5, jsxSingleQuote, bracketSameLine, tabs (2).
- **Stylelint:** запрет `TODO` в комментариях (`comment-word-disallowed-list: ["todo"]`).
- **TypeScript:** strict mode, `isolatedModules: true`. CSS plugin: `typescript-plugin-css-modules`.
- **Commit messages:** используйте `npm run commit` (cz + conventional-changelog).

## Подводные камни

- `npm test` **не запускает юнит-тесты** — это линтинг. В репозитории нет `jest`/`vitest`/тестов.
- `NODE_ENV` — production build требует `cross-env NODE_ENV=production` (указано в скрипте).
- `API_URL` должен быть в `.env` (уже в репозитории). Dev-сервер загружает его автоматически.
- `WithProtection` проверяет `user.accessToken` в сторе. Неавторизованных редиректит на `/signin`.
- `WithQuery` ожидает `{ data, isLoading, error }` из RTK Query select или thunk.
