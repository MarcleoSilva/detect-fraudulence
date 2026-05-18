-- CreateEnum
CREATE TYPE "Label" AS ENUM ('legit', 'fraud');

-- CreateTable
CREATE TABLE "VectorDatabase" (
    "vector" DOUBLE PRECISION[],
    "label" "Label" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VectorDatabase_vector_key" ON "VectorDatabase"("vector");
