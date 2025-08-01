import { NextApiRequest, NextApiResponse } from 'next';
import { getFortniteMapInfo } from '@/lib/fortnite';

interface FortniteMapRequest {
  mapCode1: string;
  mapCode2: string;
}

const getFortniteMaps = async (req: NextApiRequest, res: NextApiResponse) => {
  const { mapCode1, mapCode2 } = req.query as FortniteMapRequest;

  if (!mapCode1 || !mapCode2) {
    return res.status(400).json({ error: 'Both map codes are required' });
  }

  try {
    const [map1, map2] = await Promise.all([getFortniteMapInfo(mapCode1), getFortniteMapInfo(mapCode2)]);

    return res.status(200).json({ map1, map2 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch map data' });
  }
};

export default getFortniteMaps;