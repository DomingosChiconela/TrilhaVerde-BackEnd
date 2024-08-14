-- CreateEnum
CREATE TYPE "status" AS ENUM ('Pendente', 'recusado', 'aceite');

-- CreateTable
CREATE TABLE "requestResidue" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'Pendente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requestResidue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requestResidue" ADD CONSTRAINT "requestResidue_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requestResidue" ADD CONSTRAINT "requestResidue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
