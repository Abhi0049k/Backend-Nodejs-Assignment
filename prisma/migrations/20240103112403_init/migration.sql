-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_customerId_fkey";

-- AlterTable
ALTER TABLE "Table" ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
