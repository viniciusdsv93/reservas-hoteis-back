/*
  Warnings:

  - Added the required column `id_hotel` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "id_hotel" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
