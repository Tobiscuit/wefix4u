import { createAuthRouteHandlers } from '@/lib/auth-utils';

export const GET = createAuthRouteHandlers({
  redirectOnSignInComplete: '/dashboard',
  redirectOnSignOutComplete: '/',
});
