# File-based маршрутизация

TanStack Router сканирует `src/pages` и автоматически создаёт
`src/app/providers/router/routeTree.gen.ts` при запуске Vite (`npm run dev`
или `npx vite build`). Сгенерированный файл хранится в Git: он нужен TypeScript
до запуска Vite в команде `npm run build`. Вручную его не редактируют.

## Структура

- `src/pages/__root.tsx` — корневой layout с `Outlet`.
- `src/pages/index.tsx` — `/`.
- `src/pages/login.tsx` — `/login`.
- `src/pages/register.tsx` — `/register`.
- `src/app/providers/router/router.ts` — экземпляр роутера и регистрация типов.
- `src/app/providers/router/index.tsx` — React-провайдер.

Компоненты страниц остаются в существующих папках `ui`. Файлы маршрутов
импортируют их и экспортируют `Route`, созданный через `createFileRoute`.

## Добавление страницы

Создай `src/pages/about.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: () => <h1>О проекте</h1>,
});
```

При работающем dev-сервере дерево обновится автоматически. Регистрировать
страницу в `router.ts` или вызывать `addChildren` вручную не нужно.

## Исключения

В `vite.config.ts` настроен `routeFileIgnorePattern`:

- папки `ui` и `model` не являются маршрутами;
- все файлы `.ts` (включая существующий `login/index.ts`) игнорируются;
- файлы маршрутов должны иметь расширение `.tsx`;
- дополнительные служебные файлы/папки можно исключать префиксом `-`
  (стандартное поведение TanStack Router).

Обычный компонент `.tsx` вне исключённых папок будет рассматриваться как
маршрут, поэтому размещай UI в `ui`, а не рядом с route-файлами.
