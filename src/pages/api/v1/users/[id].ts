import db from '@lib/db/index';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const user = params.id
    ? await db.query.user.findFirst({
        where: (users, { eq }) => eq(users.id, Number(params.id)),
      })
    : undefined;
  if (!user) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }
  return new Response(JSON.stringify(user));
};
