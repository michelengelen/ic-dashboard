-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "pushToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PushSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "github" BOOLEAN NOT NULL DEFAULT true,
    "gitlab" BOOLEAN NOT NULL DEFAULT true,
    "bitbucket" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PushSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PushSettings_userId_key" ON "PushSettings"("userId");

-- AddForeignKey
ALTER TABLE "PushSettings" ADD CONSTRAINT "PushSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
