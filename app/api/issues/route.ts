import prisma from '@/lib/prisma';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query as { userId: string };
  const services = await prisma.service.findMany({ where: { userId } });

  const results = await Promise.all(
    services.map((service) =>
      axios
        .get(`https://api.${service.provider.toLowerCase()}.com/issues`, {
          headers: { Authorization: `Bearer ${service.accessToken}` }
        })
        .then((res) => res.data)
    )
  );

  res.json(results.flat());
}
