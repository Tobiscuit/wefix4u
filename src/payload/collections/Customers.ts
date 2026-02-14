import { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
  slug: 'customers',
  access: {
    read: () => true, // Secure this later (e.g., only admins or owner)
    create: () => true, // Secure this later (e.g., only admins or during signup)
    update: () => true, // Secure this later
    delete: () => true, // Secure this later
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    // We can link repairs here as well via a "reverse" relationship if needed,
    // but the foreign key is usually on the "Many" side (Repair).
  ],
};
