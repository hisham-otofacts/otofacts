import { middleware as authApiMiddleware } from '@libs/middlewares/auth-api';
import { middleware as authPageMiddleware } from '@libs/middlewares/auth-page';
import { middleware as contextLocalsMiddleware } from '@libs/middlewares/context-locals';
import { middleware as contextSessionMiddleware } from '@libs/middlewares/context-session';
import { middleware as validPageMiddleware } from '@libs/middlewares/valid-page';
import { sequence } from 'astro/middleware';

export const onRequest = sequence(
  authApiMiddleware,
  contextLocalsMiddleware,
  validPageMiddleware,
  authPageMiddleware,
  contextSessionMiddleware,
);
