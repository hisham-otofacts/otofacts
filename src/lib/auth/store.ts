import Clerk from '@clerk/clerk-js';
import { atom } from 'nanostores';

export const auth = atom<Clerk | null>(null);
let clerk: Clerk;

export const initializeClerk = () => {
  const authNano = auth.get();
  if (authNano) return;

  clerk = new Clerk(import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY);
  clerk
    .load()
    .then(() => {
      auth.set(clerk);
    })
    .catch((error) => console.error(error));
};
