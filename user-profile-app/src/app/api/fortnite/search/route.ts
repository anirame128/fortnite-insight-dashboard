import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const cache = new Map<string, { data: any[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => resolve(func(...args)), delay);
    });
  };
}

async function scrapeMaps(query: string) {
  const url = `https://fortnite.gg/maps?search=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch');
  const html = await res.text();
  const $ = cheerio.load(html);

  const maps: any[] = [];
  $('.island-detail').each((_, el) => {
    const $el = $(el);
    const title = $el.find('h1').first().text().trim();
    const code = $el.find('.copy-code').text().trim();
    const description = $el.find('.island-desc').text().trim();
    const tags: string[] = [];
    $el.find('.island-tags .island-tag').each((_, tagEl) => {
      tags.push($(tagEl).text().trim());
    });

    if (title && code) {
      maps.push({ title, code, description, tags });
    }
  });

  return maps;
}

const debouncedScrape = debounce(scrapeMaps, 300);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const cacheKey = query.trim().toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  try {
    const data = await debouncedScrape(query.trim());
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch maps' },
      { status: 500 }
    );
  }
}