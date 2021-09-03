-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Servise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "Reviews" REAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "location" REAL NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Analityc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ServiseID" TEXT NOT NULL,
    "Views" INTEGER NOT NULL,
    "Clicks" INTEGER NOT NULL,
    "Contacts" INTEGER NOT NULL,
    "reports" INTEGER NOT NULL,
    FOREIGN KEY ("ServiseID") REFERENCES "Servise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "enumCategory" (
    "1" INTEGER NOT NULL,
    "2" INTEGER NOT NULL,
    "3" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "enumCategory.1_unique" ON "enumCategory"("1");

-- CreateIndex
CREATE UNIQUE INDEX "enumCategory.2_unique" ON "enumCategory"("2");

-- CreateIndex
CREATE UNIQUE INDEX "enumCategory.3_unique" ON "enumCategory"("3");
