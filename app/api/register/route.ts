import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.create({ data: { email, password } });
  return Response.json({ success: true, user });
}
