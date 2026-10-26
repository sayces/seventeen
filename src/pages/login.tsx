import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from './login/index';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
