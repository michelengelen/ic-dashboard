import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const settings = await prisma.notificationPreference.findUnique({ where: { userId: String(userId) } });
  res.json(settings);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, github, gitlab, bitbucket } = req.body;
  await prisma.notificationPreference.upsert({
    where: { userId },
    update: { github, gitlab, bitbucket },
    create: { userId, github, gitlab, bitbucket }
  });

  res.json({ success: true });
}
