-- CreateTable
CREATE TABLE "hotels" (
    "id" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "apartment" TEXT NOT NULL,
    "check_in_date" TIMESTAMP(3) NOT NULL,
    "check_out_date" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations_guests" (
    "id" TEXT NOT NULL,
    "id_reserve" TEXT NOT NULL,
    "id_guest" TEXT NOT NULL,

    CONSTRAINT "reservations_guests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hotels_CNPJ_key" ON "hotels"("CNPJ");

-- AddForeignKey
ALTER TABLE "reservations_guests" ADD CONSTRAINT "reservations_guests_id_reserve_fkey" FOREIGN KEY ("id_reserve") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations_guests" ADD CONSTRAINT "reservations_guests_id_guest_fkey" FOREIGN KEY ("id_guest") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
