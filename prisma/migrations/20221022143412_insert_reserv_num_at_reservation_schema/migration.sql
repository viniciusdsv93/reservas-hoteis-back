/*
  Warnings:

  - Added the required column `reservNum` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "reservNum" TEXT NOT NULL;
