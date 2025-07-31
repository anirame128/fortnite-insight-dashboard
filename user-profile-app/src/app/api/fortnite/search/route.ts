```ts
// user-profile-app/src/app/api/fortnite/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in ms
const cache = new Map<string, { data: any; timestamp: number }>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter "q"' }, { status: 400 });
  }

  const cacheKey = query.toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  const url = `https://fortnite.gg/maps?search=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) {
      throw new Error(`Upstream error: ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const results = $('.island-detail')
      .map((_, el) => {
        const $el = $(el);
        const title = $el.find('h1').text().trim();
        const mapCode = $el.find('.copy-code').text().trim();
        const description = $el.find('.island-desc').text().trim();
        const tags = $el
          .find('.island-tags .island-tag')
          .map((_, tag) => $(tag).text().trim())
          .get();

        return { title, mapCode, description, tags };
      })
      .get();

    const payload = { query, results };
    cache.set(cacheKey, { data: payload, timestamp: Date.now() });
    return NextResponse.json(payload);
  } catch (err: any) {
    console.error('Scrape error:', err.message);
    return NextResponse.json({ error: 'Failed to fetch Fortnite.gg data' }, { status: 500 });
  }
}
```