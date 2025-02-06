import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { userId, pushToken } = await req.json();
  await prisma.user.update({ where: { id: userId }, data: { pushToken } });
  return Response.json({ success: true });
}
