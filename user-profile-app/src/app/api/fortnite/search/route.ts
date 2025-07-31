import { NextRequest, NextResponse } from 'next/server';
import cheerio from 'cheerio';

interface FortniteMap {
  title: string;
  code: string;
  description: string;
  tags: string[];
}

const cache = new Map<string, { data: FortniteMap[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  const cacheKey = query.toLowerCase();
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json({ maps: cached.data });
  }

  try {
    const url = `https://fortnite.gg/maps?search=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const maps: FortniteMap[] = [];

    $('.island-detail').each((_, element) => {
      const $card = $(element);
      
      const title = $card.find('h1').first().text().trim();
      const code = $card.find('.copy-code').first().text().trim();
      const description = $card.find('.island-desc').first().text().trim();
      
      const tags: string[] = [];
      $card.find('.island-tags .island-tag').each((_, tag) => {
        tags.push($(tag).text().trim());
      });

      if (title && code) {
        maps.push({
          title,
          code,
          description,
          tags,
        });
      }
    });

    cache.set(cacheKey, {
      data: maps,
      timestamp: Date.now(),
    });

    return NextResponse.json({ maps });
  } catch (error) {
    console.error('Error fetching Fortnite maps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch maps' },
      { status: 500 }
    );
  }
}