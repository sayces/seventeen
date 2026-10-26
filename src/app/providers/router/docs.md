# Code-based маршрутизация (TanStack Router)

Маршруты задаются явно в коде. Генератор и Vite-плагин маршрутизации не нужны;
имена файлов в `src/pages` не определяют URL.

## Структура

- `rootRoute.ts` — `createRootRoute` с `Outlet` для дочерних страниц.
- `routeTree.ts` — `createRoute`, связи родителей через `getParentRoute`
  и сборка дерева через `rootRoute.addChildren`.
- `router.ts` — единственный экземпляр `createRouter` и расширение интерфейса
  `Register` для типизации `Link`, `useNavigate` и других API TanStack Router.
- `index.tsx` — `RouterProvider`, подключённый в `App`.
- `src/pages` — компоненты страниц, не файлы конфигурации маршрутов.

## Текущие маршруты

| URL | Компонент |
| --- | --- |
| `/` | `HomePage` |
| `/login` | `LoginPage` |
| `/register` | `RegisterPage` |

Главная страница импортируется напрямую. Формы загружаются по необходимости
через `lazyRouteComponent` с указанием именованного экспорта. Route-конфигурация
при этом остаётся доступна синхронно для сопоставления URL.

## Добавление маршрута

В `routeTree.ts` создай маршрут и включи его в `addChildren`:

```tsx
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'about',
  component: lazyRouteComponent(
    () => import('@/pages/about/ui/AboutPage'),
    'AboutPage',
  ),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  aboutRoute,
]);
```

Для вложенности передавай непосредственного родителя в `getParentRoute`,
собирай его детей через `addChildren` и оставляй `Outlet` в компоненте родителя.
Для динамических сегментов используй `path: '$userId'`.

Для клиентской навигации используй `Link` из `@tanstack/react-router`,
например `<Link to="/login">Войти</Link>`.

Сгенерированного дерева больше нет: изменения маршрутов нужно регистрировать
вручную. Команда `npm run build` по-прежнему проверяет TypeScript до сборки Vite.
