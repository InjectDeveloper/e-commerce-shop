/*
  Warnings:

  - You are about to drop the column `isBuied` on the `License` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "License" DROP COLUMN "isBuied",
ADD COLUMN     "isBuyed" BOOLEAN NOT NULL DEFAULT false;
