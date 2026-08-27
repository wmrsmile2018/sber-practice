## Архитектура и структура

shared/ui только презентационные компоненты, без стора и API (2)
Изоляция фич по папкам, слои shared/, features/, pages/ соблюдены (1)
Устранены лишние prop-chains (1)

### shared/ui только презентационные компоненты

`shared/ui` содержит **только презентационные компоненты**, без стора и API:

| Компонент    | Назначение                           |
| ------------ | ------------------------------------ |
| `ButtonUI`   | Кнопки (filled, icon, ghost, border) |
| `InputUI`    | Инпуты с floating label              |
| `ModalUI`    | Модалка на React Portal              |
| `Spinner`    | Лоадер                               |
| `Logo`       | Логотип                              |
| `Rating`     | Рейтинг звёздами                     |
| `Price`      | Отображение цены                     |
| `AnchorUI`   | Ссылка-кнопка                        |
| `ButtonBack` | Кнопка «Назад»                       |
| `AppShell`   | Обёртка приложения                   |

API и store вынесены в `shared/store/` и `shared/api/`.

### Изоляция фич по папкам

Структура строго соблюдена, путь-алиасы настроены в Vite и esbuild:

| Слой       | Путь          | Содержимое                                     |
| ---------- | ------------- | ---------------------------------------------- |
| `shared`   | `1-shared/`   | UI, хуки, store, API, утилиты, ассеты          |
| `entities` | `2-entities/` | Сущности (user, cart)                          |
| `features` | `3-features/` | Фичи (search, loadMore, sort, CartList)        |
| `widgets`  | `4-widgets/`  | Виджеты (Header, Footer, CardList, ReviewList) |
| `pages`    | `5-pages/`    | Страницы (HomePage, ProductPage, CartPage…)    |
| `app`      | `6-app/`      | Провайдеры, роутер, корневой App               |

### Устранены лишние prop-chains

---

## Оптимизация рендеров

### Profiler — ❌

### React.memo

`memo` применён к ключевым компонентам:

- `AppShell`, `Header`, `CardList`, `CartPage`, `ProductPage`, `ProfilePage`
- `ReviewList`, `SignInForm` — все страницы-контейнеры обёрнуты в `memo`
- `ButtonUI`, `InputUI`, `ModalUI`, `Footer` — без memo (уместно, компоненты малы или рендерятся редко)

## React.Portal

### Портал + ESC + overlay

- `createPortal` рендерит модалку в `#modal-root` (присутствует в `index.html`)
- **ESC**: `window.addEventListener('keydown', handleEsc)`
- **Overlay**: `onClick={onClose}` на оверлее

### Фокус — ❌ (0/1)

- `ModalUI` **не управляет фокусом**: не переносит фокус при открытии, не возвращает на триггер при закрытии

---

## useRef — **2 / 2 балла**

### Хранение состояния — ✅ (1/1)

| Где                 | Что хранит                             | Зачем                                      |
| ------------------- | -------------------------------------- | ------------------------------------------ |
| `ModalUI.parentRef` | DOM-элемент `#modal-root`              | Не вызывает перерисовок при скрытии/показе |
| `useLoadMore.ref`   | DOM-элемент для `IntersectionObserver` | DOM-интеракция без рендеров                |

### Автофокус / DOM-интеракция — ✅ (1/1)

| Компонент    | Паттерн                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `SignInForm` | `emailRef` + `useLayoutEffect` + `requestAnimationFrame(() => focus())` |
| `SignUpForm` | Аналогичный `emailRef` с автофокусом                                    |
| `HomePage`   | `ref` для `IntersectionObserver` в `useLoadMore`                        |
| `ModalUI`    | `parentRef` для управления `display: none/block` через DOM              |

---

## Альтернативная сборка (esbuild) — **2 / 2 балла**

### Рабочая сборка — ✅ (1/1)

`esbuild.config.mjs` — полностью рабочая конфигурация:

| Плагин             | Назначение                                           |
| ------------------ | ---------------------------------------------------- |
| `aliasPlugin`      | Резолв путь-алиасов (shared/, entities/, features/…) |
| `cssModulesPlugin` | CSS Modules resolver (простой хешинг)                |
| `svgPlugin`        | SVG loader (data URI)                                |
| `htmlPlugin`       | HTML injector                                        |

| Опция       | Значение          |
| ----------- | ----------------- |
| `splitting` | ✅ code splitting |
| `minify`    | ✅ production     |
| `sourcemap` | ✅ development    |
| `jsx`       | automatic         |
| `target`    | es2023            |

Скрипты: `build:esbuild`, `build:esbuild:dev`

### Сравнение с Vite — ✅ (1/1)

| Параметр        | Vite (основная) | esbuild (альтернативная) |
| --------------- | --------------- | ------------------------ |
| Размер          | **812K**        | 1.2M                     |
| Файлов JS       | ~17             | ~39                      |
| CSS-сплитинг    | ✅ (по роутам)  | ❌                       |
| CSS Modules     | ✅ нативный     | ⚠️ простой хешинг        |
| HMR             | ✅ мгновенный   | ❌ нет                   |
| Скорость сборки | ✅ быстрая      | ✅ **быстрее**           |
| SVG             | ✅ svgr         | ⚠️ data URI              |

**Вывод**: esbuild собирает быстрее, но Vite даёт меньший бандл, CSS-сплитинг, HMR и корректную обработку CSS Modules. Для разработки Vite предпочтительнее, esbuild подходит как быстрый fallback.

---

## React 19 hooks — ❌

## Структура папок

```
src/
├── 1-shared/
│   ├── api/                    # API сервисы (ApiServise.ts, hooks)
│   ├── assets/
│   │   ├── icons/              # SVG-иконки (Telegram, Vk, Like, Star и т.д.)
│   │   └── svg/                # Исходные SVG
│   ├── hooks/                  # Кастомные хуки (useDebounce, usePagination)
│   ├── store/
│   │   ├── HOCs/               # WithProtection, WithQuery
│   │   ├── api/                # RTK Query slices (authApi, productsApi)
│   │   ├── hooks/              # useProducts
│   │   ├── reducers/           # rootReducer
│   │   ├── slices/             # RTK slices (cart, products, user)
│   │   ├── store.ts            # configureStore
│   │   └── types.ts            # Типы
│   ├── ui/                     # Презентационные компоненты
│   │   ├── AnchorUI/
│   │   ├── AppShell/
│   │   ├── ButtonBack/
│   │   ├── ButtonUI/
│   │   ├── InputUI/
│   │   ├── Logo/
│   │   ├── ModalUI/            # React Portal модалка
│   │   ├── Price/
│   │   ├── Rating/
│   │   ├── Spinner/
│   │   └── index.ts
│   └── utils/                  # Утилиты (getMessageFromError, isLiked)
├── 2-entities/
│   ├── cart/                   # Сущности корзины (Card, CartCounter и т.д.)
│   └── user/
│       └── ui/
│           ├── SignInForm/     # с автофокусом через useRef
│           └── SignUpForm/
├── 3-features/
│   ├── CartList/               # Список товаров в корзине
│   ├── loadMore/               # IntersectionObserver для подгрузки
│   ├── search/                 # Поиск с debounce
│   └── sort/                   # Сортировка продуктов
├── 4-widgets/
│   ├── CardList/               # Сетка карточек товаров
│   ├── Footer/
│   ├── Header/                 # с поиском, модалкой, счётчиками
│   └── ReviewList/
│       └── ReviewForm/         # Форма отзывов (без отправки)
├── 5-pages/
│   ├── CartPage/
│   ├── FavoritesPage/
│   ├── HomePage/               # с useLoadMore, useRef, сортировкой
│   ├── NotFoundPage/
│   ├── ProductPage/            # с WithProtection, RTK Query
│   ├── ProfilePage/            # с WithProtection
│   └── SignUpPage/
└── 6-app/
    ├── index.ts
    ├── App.tsx                 # Layout: AppShell + Header + Outlet + Footer
    └── providers/
        └── router/
            └── config/
                └── router.tsx  # createBrowserRouter + lazy loading
```

---

## Сравнение сборок

### Vite (основная сборка)

- **Инструмент**: Vite 8 + `@vitejs/plugin-react`
- **Размер**: 812K
- **Файлов**: ~17 JS + CSS
- **Код-сплитинг**: по роутам (React.lazy)
- **CSS**: нативная обработка CSS Modules + PostCSS (autoprefixer, cssnano)
- **HMR**: ✅ мгновенный
- **Преимущества**: оптимизированный CSS-сплитинг, меньший размер бандла, нативная поддержка CSS Modules

### esbuild (альтернативная сборка)

- **Инструмент**: esbuild 0.28 + кастомные плагины
- **Размер**: 1.2M
- **Файлов**: ~39 (много chunk-файлов)
- **Код-сплитинг**: автоматический (chunk-\*)
- **CSS**: ❌ не обрабатывается (только JS-бандл)
- **HMR**: ❌ нет
- **Преимущества**: очень быстрая сборка, кастомный CSS Modules resolver, SVG loader
- **Недостатки**: больший размер, нет CSS-сплитинга, нет HMR, упрощённый CSS Modules (sequential хешинг вместо локальных имён)
