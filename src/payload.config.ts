import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

import { Repairs } from './payload/collections/Repairs';
import { Customers } from './payload/collections/Customers';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users', // Default user collection
  },
  collections: [
    // We'll use the default Users collection for admins for now
    {
      slug: 'users',
      auth: true,
      access: {
        delete: () => false,
        update: () => true,
      },
      fields: [],
    },
    Repairs,
    Customers,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-do-not-use-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
});
