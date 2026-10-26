import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { HomePage } from '@/pages/home/ui/HomePage';
import { rootRoute } from './rootRoute';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  component: lazyRouteComponent(
    () => import('@/pages/login/ui/LoginPage'),
    'LoginPage',
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'register',
  component: lazyRouteComponent(
    () => import('@/pages/login/ui/RegisterPage'),
    'RegisterPage',
  ),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
]);
