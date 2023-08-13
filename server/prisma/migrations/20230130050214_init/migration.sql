/*
  Warnings:

  - Added the required column `productId` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "License" ADD COLUMN     "productId" INTEGER NOT NULL;
