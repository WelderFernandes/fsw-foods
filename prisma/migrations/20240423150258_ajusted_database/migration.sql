-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "deliveryFee" DROP DEFAULT,
ALTER COLUMN "deliveryFee" SET DATA TYPE DECIMAL(10,2);
