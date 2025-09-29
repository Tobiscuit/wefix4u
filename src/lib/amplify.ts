import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

// Only configure Amplify if we have real outputs (not placeholders)
if (outputs.auth.user_pool_id !== 'placeholder') {
  Amplify.configure(outputs);
}
