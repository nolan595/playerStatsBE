-- CreateTable
CREATE TABLE "SportEvent" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "externalData" JSONB,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "homeTeamId" INTEGER NOT NULL,
    "awayTeamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SportEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SportEvent" ADD CONSTRAINT "SportEvent_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportEvent" ADD CONSTRAINT "SportEvent_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
