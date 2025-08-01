import { NextApiRequest, NextApiResponse } from 'next';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { getFortniteData } from '@/utils/fortnite-api';

const rateLimiter = new RateLimiterMemory({
  points: 100, // 100 requests
  duration: 60, // per minute
});

const fortniteRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await rateLimiter.consume(req.ip);
  } catch (rateLimiterRes) {
    if (rateLimiterRes.msBeforeNext) {
      res.setHeader('Retry-After', Math.floor(rateLimiterRes.msBeforeNext / 1000));
      return res.status(429).json({ error: 'Too many requests' });
    }
  }

  if (req.method === 'GET') {
    const fortniteData = await getFortniteData();
    return res.status(200).json(fortniteData);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default fortniteRoute;