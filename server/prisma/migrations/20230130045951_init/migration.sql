/*
  Warnings:

  - You are about to drop the column `productId` on the `License` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productTitle` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "License" DROP CONSTRAINT "License_productId_fkey";

-- AlterTable
ALTER TABLE "License" DROP COLUMN "productId",
ADD COLUMN     "productTitle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_productTitle_fkey" FOREIGN KEY ("productTitle") REFERENCES "Product"("title") ON DELETE CASCADE ON UPDATE CASCADE;
