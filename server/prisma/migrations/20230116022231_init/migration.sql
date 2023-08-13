/*
  Warnings:

  - You are about to drop the column `instruction` on the `License` table. All the data in the column will be lost.
  - Added the required column `instruction` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "License" DROP COLUMN "instruction";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "instruction" TEXT NOT NULL;
