import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates the data model for WE FIX 4U.
It includes Customers, Repairs, Payments, and Status Logs.
Authorization rules ensure Customers only see their own data,
while Admins can manage everything.
=========================================================================*/

const schema = a.schema({
  Customer: a
    .model({
      email: a.string().required(),
      phoneNumber: a.string(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      address: a.string(),
      notes: a.string(), // Internal staff notes
      repairs: a.hasMany('Repair', 'customerId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.group('Admins'),
    ]),

  Repair: a
    .model({
      customerId: a.id().required(),
      customer: a.belongsTo('Customer', 'customerId'),
      
      // Device Details
      deviceType: a.string().required(), // phone, laptop, tablet
      deviceModel: a.string().required(),
      serialNumber: a.string(),
      devicePassword: a.string(), // Encrypted at rest by DynamoDB, but visible to Admins
      devicePattern: a.string(), // e.g. "1-2-3-6"
      
      // Service Details
      serviceType: a.string().required(), // screen-replacement, battery-repair, etc.
      description: a.string(),
      warrantyStatus: a.enum(['none', 'limited', 'lifetime']),
      
      // Status & Workflow
      status: a.enum(['pending', 'diagnosed', 'inProgress', 'completed', 'readyForPickup', 'pickedUp', 'cancelled']),
      
      // Financials
      estimatedCost: a.float(),
      actualCost: a.float(),
      
      // Shipping (Mail-in)
      isMailIn: a.boolean(),
      shippingLabelUrl: a.string(),
      trackingNumber: a.string(),
      
      // Timestamps
      estimatedCompletion: a.datetime(),
      completedAt: a.datetime(),
      
      // Relations
      notes: a.string(),
      photos: a.hasMany('RepairPhoto', 'repairId'),
      appointments: a.hasMany('Appointment', 'repairId'),
      payments: a.hasMany('Payment', 'repairId'),
      statusLogs: a.hasMany('StatusLog', 'repairId'),
    })
    .authorization((allow) => [
      allow.owner().to(['read']), // Customers can only read their repairs
      allow.group('Admins'), // Admins can do everything
    ]),

  Payment: a
    .model({
      repairId: a.id().required(),
      repair: a.belongsTo('Repair', 'repairId'),
      
      amount: a.float().required(),
      method: a.enum(['cash', 'card_square', 'card_stripe', 'transfer']),
      status: a.enum(['pending', 'completed', 'refunded', 'failed']),
      date: a.datetime().required(),
      
      // PCI Compliance: NEVER store card numbers. Only store reference IDs.
      referenceId: a.string(), // Stripe Session ID or Square Transaction ID
      notes: a.string(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create']), // Customers can view history and initiate payments
      allow.group('Admins'),
    ]),

  StatusLog: a
    .model({
      repairId: a.id().required(),
      repair: a.belongsTo('Repair', 'repairId'),
      
      status: a.string().required(), // The status it moved TO
      timestamp: a.datetime().required(),
      notes: a.string(),
    })
    .authorization((allow) => [
      allow.owner().to(['read']),
      allow.group('Admins'),
    ]),

  RepairPhoto: a
    .model({
      repairId: a.id().required(),
      repair: a.belongsTo('Repair', 'repairId'),
      photoUrl: a.string().required(),
      description: a.string(),
      uploadedAt: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.owner().to(['read']),
      allow.group('Admins'),
    ]),

  Appointment: a
    .model({
      repairId: a.id().required(),
      repair: a.belongsTo('Repair', 'repairId'),
      scheduledAt: a.datetime().required(),
      type: a.enum(['dropOff', 'pickup', 'consultation']),
      status: a.enum(['scheduled', 'completed', 'cancelled']),
      notes: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.group('Admins'),
    ]),

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
    .authorization((allow) => [
      allow.group('Admins'), // Only admins can see/edit inventory
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
