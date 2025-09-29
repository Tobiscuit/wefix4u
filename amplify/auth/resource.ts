import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your authentication resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    phone: true,
  },
  userAttributes: {
    email: {
      required: true,
    },
    phoneNumber: {
      required: false,
    },
    givenName: {
      required: true,
    },
    familyName: {
      required: true,
    },
  },
  accountRecovery: ['email'],
  mfa: {
    mode: 'OPTIONAL',
    totp: true,
    sms: true,
  },
});
