-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);
