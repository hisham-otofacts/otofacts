import { env } from '@environment';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: env.UPSTASH_REDIS_URL,
  token: env.UPSTASH_REDIS_TOKEN,
});

export default redis;
