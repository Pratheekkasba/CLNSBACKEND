-- AlterTable
ALTER TABLE "InternshipPosting" ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "stipend" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "barId" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "college" TEXT;

-- AddForeignKey
ALTER TABLE "InternshipPosting" ADD CONSTRAINT "InternshipPosting_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
