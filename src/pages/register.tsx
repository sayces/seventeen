import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from './login/index';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});
