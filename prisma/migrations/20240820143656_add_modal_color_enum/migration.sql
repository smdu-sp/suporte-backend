/*
  Warnings:

  - Added the required column `tipo_id` to the `Aviso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aviso` ADD COLUMN `tipo_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Aviso` ADD CONSTRAINT `Aviso_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `tipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
