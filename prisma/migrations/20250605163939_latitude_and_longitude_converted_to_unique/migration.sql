/*
  Warnings:

  - A unique constraint covering the columns `[latitude]` on the table `tb_shelters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[longitude]` on the table `tb_shelters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_shelters_latitude_key" ON "tb_shelters"("latitude");

-- CreateIndex
CREATE UNIQUE INDEX "tb_shelters_longitude_key" ON "tb_shelters"("longitude");
