-- DropForeignKey
ALTER TABLE "License" DROP CONSTRAINT "License_productId_fkey";

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
