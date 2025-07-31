import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const debounce = searchParams.get('debounce') === 'true';

  if (!query.trim()) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const cacheKey = query.toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  if (debounce) {
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  try {
    const url = `https://fortnite.gg/maps?search=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    const maps: any[] = [];
    $('.island-detail').each((_, element) => {
      const $el = $(element);
      const title = $el.find('h1').text().trim();
      const code = $el.find('.copy-code').text().trim();
      const description = $el.find('.island-desc').text().trim();
      const tags: string[] = [];
      $el.find('.island-tags span').each((_, tag) => {
        tags.push($(tag).text().trim());
      });

      if (title && code) {
        maps.push({
          title,
          code,
          description,
          tags
        });
      }
    });

    const result = { query, maps };
    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch maps' }, { status: 500 });
  }
}