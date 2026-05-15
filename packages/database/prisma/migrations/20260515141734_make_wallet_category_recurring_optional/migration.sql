-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "budget_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "recurring_transaction" DROP CONSTRAINT "recurring_transaction_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "recurring_transaction" DROP CONSTRAINT "recurring_transaction_walletId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_walletId_fkey";

-- AlterTable
ALTER TABLE "budget" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "recurring_transaction" ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "walletId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "walletId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_transaction" ADD CONSTRAINT "recurring_transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_transaction" ADD CONSTRAINT "recurring_transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
