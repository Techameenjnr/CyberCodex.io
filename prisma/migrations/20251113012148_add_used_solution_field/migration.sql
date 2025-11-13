-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserExercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "usedSolution" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    "timeSpent" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserExercise" ("attempts", "code", "completedAt", "courseId", "createdAt", "exerciseId", "id", "isCompleted", "isLocked", "timeSpent", "updatedAt", "userId") SELECT "attempts", "code", "completedAt", "courseId", "createdAt", "exerciseId", "id", "isCompleted", "isLocked", "timeSpent", "updatedAt", "userId" FROM "UserExercise";
DROP TABLE "UserExercise";
ALTER TABLE "new_UserExercise" RENAME TO "UserExercise";
CREATE INDEX "UserExercise_userId_idx" ON "UserExercise"("userId");
CREATE INDEX "UserExercise_courseId_idx" ON "UserExercise"("courseId");
CREATE INDEX "UserExercise_isCompleted_idx" ON "UserExercise"("isCompleted");
CREATE UNIQUE INDEX "UserExercise_userId_courseId_exerciseId_key" ON "UserExercise"("userId", "courseId", "exerciseId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
