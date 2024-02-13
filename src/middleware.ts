import { middleware as authApiMiddleware } from '@lib/middlewares/auth-api';
import { middleware as authPageMiddleware } from '@lib/middlewares/auth-page';
import { middleware as contextLocalsMiddleware } from '@lib/middlewares/context-locals';
import { middleware as contextSessionMiddleware } from '@lib/middlewares/context-session';
import { middleware as validPageMiddleware } from '@lib/middlewares/valid-page';
import { sequence } from 'astro/middleware';

export const onRequest = sequence(
  authApiMiddleware,
  contextLocalsMiddleware,
  validPageMiddleware,
  authPageMiddleware,
  contextSessionMiddleware,
);
