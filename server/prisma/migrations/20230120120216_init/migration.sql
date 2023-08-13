/*
  Warnings:

  - You are about to drop the column `isBuyed` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `License` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_licenseId_fkey";

-- AlterTable
ALTER TABLE "License" DROP COLUMN "isBuyed",
DROP COLUMN "value",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "isBuied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "key" TEXT NOT NULL;

-- DropTable
DROP TABLE "Order";
