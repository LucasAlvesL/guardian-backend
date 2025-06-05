-- CreateEnum
CREATE TYPE "ResourceItemCategory" AS ENUM ('FOOD', 'MEDICATION', 'CLOTHING', 'SHELTER', 'OTHER');

-- CreateTable
CREATE TABLE "tb_persons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT,
    "special_needs" BOOLEAN NOT NULL DEFAULT false,
    "entry_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shelter_id" TEXT NOT NULL,

    CONSTRAINT "tb_persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_resources" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ResourceItemCategory" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shelter_id" TEXT NOT NULL,

    CONSTRAINT "tb_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_shelters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_shelters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_persons_cpf_key" ON "tb_persons"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tb_shelters_email_key" ON "tb_shelters"("email");

-- AddForeignKey
ALTER TABLE "tb_persons" ADD CONSTRAINT "tb_persons_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "tb_shelters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_resources" ADD CONSTRAINT "tb_resources_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "tb_shelters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
