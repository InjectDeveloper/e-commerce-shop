/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Code` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `License` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Code_value_key" ON "Code"("value");

-- CreateIndex
CREATE UNIQUE INDEX "License_value_key" ON "License"("value");
