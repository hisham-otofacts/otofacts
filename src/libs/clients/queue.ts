import { env } from '@environment';
import { Client, Receiver } from '@upstash/qstash';

export const publisher = new Client({
  baseUrl: env.QSTASH_URL,
  token: env.QSTASH_TOKEN,
});

export const receiver = new Receiver({
  currentSigningKey: env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: env.QSTASH_NEXT_SIGNING_KEY,
});
