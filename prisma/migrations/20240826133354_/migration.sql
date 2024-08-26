-- DropForeignKey
ALTER TABLE `aviso` DROP FOREIGN KEY `Aviso_tipo_id_fkey`;

-- CreateTable
CREATE TABLE `usuario_tipo` (
    `id` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,
    `id_tipo` VARCHAR(191) NOT NULL,
    `permissao` ENUM('DEV', 'ADM', 'TEC', 'USR') NOT NULL DEFAULT 'USR',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario_tipo` ADD CONSTRAINT `usuario_tipo_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_tipo` ADD CONSTRAINT `usuario_tipo_id_tipo_fkey` FOREIGN KEY (`id_tipo`) REFERENCES `tipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aviso` ADD CONSTRAINT `aviso_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `tipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
