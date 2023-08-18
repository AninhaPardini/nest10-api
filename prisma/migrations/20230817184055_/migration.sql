/*
  Warnings:

  - You are about to drop the column `url` on the `Video` table. All the data in the column will be lost.
  - Added the required column `file_path` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Video` DROP COLUMN `url`,
    ADD COLUMN `file_path` VARCHAR(255) NOT NULL;
