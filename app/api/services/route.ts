import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query as { userId: string };
  const services = await prisma.service.findMany({ where: { userId } });
  res.json(services);
}
