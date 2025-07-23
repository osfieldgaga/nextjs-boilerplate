-- CreateTable
CREATE TABLE "CreditPlan" (
    "id" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditPlan_pkey" PRIMARY KEY ("id")
);
