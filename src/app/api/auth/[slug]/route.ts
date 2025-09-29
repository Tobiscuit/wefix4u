import { createAuthRouteHandlers } from '@/lib/auth-utils';

export const GET = createAuthRouteHandlers ? createAuthRouteHandlers({
  redirectOnSignInComplete: '/dashboard',
  redirectOnSignOutComplete: '/',
}) : () => new Response('Amplify not configured', { status: 503 });
