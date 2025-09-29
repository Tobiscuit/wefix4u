import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import outputs from '../amplify_outputs.json';

// Only create auth handlers if we have real outputs (not placeholders)
let createAuthRouteHandlers: any = null;

if (outputs.auth.user_pool_id !== 'placeholder') {
  const serverRunner = createServerRunner({
    config: outputs,
  });
  createAuthRouteHandlers = serverRunner.createAuthRouteHandlers;
}

export { createAuthRouteHandlers };
