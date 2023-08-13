/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `License` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "License_code_key" ON "License"("code");
