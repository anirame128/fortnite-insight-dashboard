// src/api/fortnite/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getFortniteMapData } from '@/lib/fortnite';

const fortniteRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const mapData = await getFortniteMapData();
        return res.status(200).json(mapData);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch map data' });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default fortniteRoute;