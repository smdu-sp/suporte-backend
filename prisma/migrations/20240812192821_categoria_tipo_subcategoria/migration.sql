/*
  Warnings:

  - You are about to drop the column `categoria_id` on the `tipos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `categorias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `subcategoria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `tipos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `categorias` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `subcategoria` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `tipos` DROP COLUMN `categoria_id`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `categorias_nome_key` ON `categorias`(`nome`);

-- CreateIndex
CREATE UNIQUE INDEX `subcategoria_nome_key` ON `subcategoria`(`nome`);

-- CreateIndex
CREATE UNIQUE INDEX `tipos_nome_key` ON `tipos`(`nome`);
