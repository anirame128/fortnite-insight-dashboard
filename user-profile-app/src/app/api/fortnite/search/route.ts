import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  const cacheKey = `fortnite-search-${query}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const url = `https://fortnite.gg/maps?search=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const results: any[] = [];
    $('.island-detail').each((_, element) => {
      const title = $(element).find('h1').text().trim();
      const mapCode = $(element).find('.copy-code').text().trim();
      const description = $(element).find('.island-desc').text().trim();
      const tags: string[] = [];
      $(element).find('.island-tags .island-tag').each((_, tagEl) => {
        tags.push($(tagEl).text().trim());
      });

      results.push({ title, mapCode, description, tags });
    });

    cache.set(cacheKey, results);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}