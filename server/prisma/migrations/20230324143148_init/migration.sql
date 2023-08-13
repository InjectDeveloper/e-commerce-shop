/*
  Warnings:

  - Added the required column `groupTitle` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "License" ADD COLUMN     "isBuyed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "groupTitle" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_title_key" ON "Group"("title");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_groupTitle_fkey" FOREIGN KEY ("groupTitle") REFERENCES "Group"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
