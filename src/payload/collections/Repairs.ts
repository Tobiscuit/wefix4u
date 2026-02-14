import { CollectionConfig } from 'payload';

export const Repairs: CollectionConfig = {
  slug: 'repairs',
  access: {
    read: () => true, // Secure this later (e.g., only admins or owners)
    create: () => true, // Secure this later (e.g., only admins)
    update: () => true, // Secure this later
    delete: () => true, // Secure this later
  },
  admin: {
    useAsTitle: 'ticketCode',
  },
  fields: [
    {
      name: 'ticketCode',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'received',
      options: [
        { label: 'Received', value: 'received' },
        { label: 'Diagnosed', value: 'diagnosed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Ready for Pickup', value: 'ready' },
        { label: 'Picked Up', value: 'picked-up' },
      ],
    },
    {
      name: 'deviceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Phone', value: 'phone' },
        { label: 'Tablet', value: 'tablet' },
        { label: 'Laptop', value: 'laptop' },
        { label: 'Console', value: 'console' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'deviceModel',
      type: 'text',
      required: true,
    },
    {
      name: 'serialNumber',
      type: 'text',
    },
    {
      name: 'serviceType',
      type: 'text', // Could be select later
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'estimatedCost',
      type: 'number',
    },
    {
      name: 'completionDate',
      type: 'date',
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
  ],
};
