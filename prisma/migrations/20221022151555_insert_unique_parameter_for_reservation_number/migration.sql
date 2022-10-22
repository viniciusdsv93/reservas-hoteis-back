/*
  Warnings:

  - A unique constraint covering the columns `[reservNum]` on the table `reservations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reservations_reservNum_key" ON "reservations"("reservNum");
