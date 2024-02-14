import db from '@lib/db/index';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const user = params.id
    ? await db.query.testimonial.findFirst({
        where: (testimonials, { eq }) => eq(testimonials.id, Number(params.id)),
      })
    : undefined;
  if (!user) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }
  return new Response(JSON.stringify(user));
};
