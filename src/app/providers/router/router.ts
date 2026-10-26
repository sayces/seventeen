import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree';

export const router = createRouter({ routeTree });

// Типизация для навигации
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}