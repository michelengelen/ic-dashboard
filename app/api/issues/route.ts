import { auth } from '@/auth.ts';
import { type Account, retrieveAccount } from '@/lib/prisma.ts';
import { getOctokit } from '@/lib/github.ts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.error();
  }

  const session = await auth();
  const account: Account = await retrieveAccount({
    where: { userId: session?.user?.id, provider: 'github' },
  });

  if (!account?.access_token) {
    return NextResponse.error();
  }

  const octokit = getOctokit(account.access_token);
  const { data } = await octokit.issues.listForRepo({ owner, repo });

  return NextResponse.json(data);
}
