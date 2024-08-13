/*
  Warnings:

  - You are about to drop the column `categoria_id` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `ordens` table. All the data in the column will be lost.
  - You are about to drop the column `tecnico_id` on the `servicos` table. All the data in the column will be lost.
  - Added the required column `tipo_id` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria_id` to the `ordens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoria_id` to the `ordens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_id` to the `ordens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `servicos` DROP FOREIGN KEY `servicos_tecnico_id_fkey`;

-- AlterTable
ALTER TABLE `categorias` DROP COLUMN `categoria_id`,
    DROP COLUMN `nivel`,
    ADD COLUMN `tipo_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ordens` DROP COLUMN `tipo`,
    ADD COLUMN `categoria_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `subcategoria_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipo_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `servicos` DROP COLUMN `tecnico_id`;

-- CreateTable
CREATE TABLE `tipos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `categoria_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategoria` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `categoria_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ServicoToUsuario` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ServicoToUsuario_AB_unique`(`A`, `B`),
    INDEX `_ServicoToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `tipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_subcategoria_id_fkey` FOREIGN KEY (`subcategoria_id`) REFERENCES `subcategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categorias` ADD CONSTRAINT `categorias_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `tipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategoria` ADD CONSTRAINT `subcategoria_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServicoToUsuario` ADD CONSTRAINT `_ServicoToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `servicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServicoToUsuario` ADD CONSTRAINT `_ServicoToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
