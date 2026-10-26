import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '../index';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});
