import { createClerkClient } from '@clerk/clerk-sdk-node';
import { env } from '@environment';

const auth = createClerkClient({
  publishableKey: env.PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY,
});

export default auth;
