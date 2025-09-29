import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user can "create", "read", "update", and "delete" any
"Todo" records.
=========================================================================*/
const schema = a.schema({
  Customer: a
    .model({
      email: a.string().required(),
      phoneNumber: a.string(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      address: a.string(),
      repairs: a.hasMany('Repair', 'customerId'),
    })
    .authorization((allow) => [allow.owner()]),

  Repair: a
    .model({
      customerId: a.id().required(),
      customer: a.belongsTo('Customer', 'customerId'),
      deviceType: a.string().required(), // phone, laptop, tablet
      deviceModel: a.string().required(),
      serviceType: a.string().required(), // screen-replacement, battery-repair, etc.
      status: a.enum(['pending', 'diagnosed', 'in-progress', 'completed', 'ready-for-pickup', 'picked-up']),
      description: a.string(),
      estimatedCost: a.float(),
      actualCost: a.float(),
      estimatedCompletion: a.datetime(),
      completedAt: a.datetime(),
      notes: a.string(),
      photos: a.hasMany('RepairPhoto', 'repairId'),
      appointments: a.hasMany('Appointment', 'repairId'),
    })
    .authorization((allow) => [allow.owner()]),

  RepairPhoto: a
    .model({
      repairId: a.id().required(),
      repair: a.belongsTo('Repair', 'repairId'),
      photoUrl: a.string().required(),
      description: a.string(),
      uploadedAt: a.datetime().required(),
    })
    .authorization((allow) => [allow.owner()]),

  Appointment: a
    .model({
      repairId: a.id().required(),
      repair: a.belongsTo('Repair', 'repairId'),
      scheduledAt: a.datetime().required(),
      type: a.enum(['drop-off', 'pickup', 'consultation']),
      status: a.enum(['scheduled', 'completed', 'cancelled']),
      notes: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  Inventory: a
    .model({
      partName: a.string().required(),
      partNumber: a.string(),
      deviceType: a.string().required(),
      deviceModel: a.string(),
      quantity: a.integer().required(),
      cost: a.float().required(),
      supplier: a.string(),
      lastRestocked: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
