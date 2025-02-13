import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

export type Account = Prisma.PromiseReturnType<typeof retrieveAccount>

export async function retrieveAccount(
  accountConditions: Prisma.AccountFindFirstArgs
): Promise<Prisma.AccountGetPayload<Prisma.AccountFindFirstArgs> | null> {
  return prisma.account.findFirst(accountConditions);
}

export type User = Prisma.PromiseReturnType<typeof retrieveUser>

export async function retrieveUser(
  userConditions: Prisma.UserFindFirstArgs
): Promise<Prisma.UserGetPayload<Prisma.UserFindFirstArgs> | null> {
  return prisma.user.findFirst(userConditions);
}
