/*
  Warnings:

  - You are about to drop the column `licenseId` on the `Activation` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `isBuyed` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `License` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codeId]` on the table `License` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeId` to the `Activation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activation" DROP CONSTRAINT "Activation_licenseId_fkey";

-- DropIndex
DROP INDEX "License_code_key";

-- AlterTable
ALTER TABLE "Activation" DROP COLUMN "licenseId",
ADD COLUMN     "codeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "License" DROP COLUMN "code",
DROP COLUMN "isBuyed",
DROP COLUMN "key",
ADD COLUMN     "codeId" INTEGER,
ADD COLUMN     "value" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "codeId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_codeId_key" ON "Order"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "License_codeId_key" ON "License"("codeId");

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_productTitle_fkey" FOREIGN KEY ("productTitle") REFERENCES "Product"("title") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activation" ADD CONSTRAINT "Activation_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;
