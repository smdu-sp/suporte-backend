-- CreateTable
CREATE TABLE `Aviso` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `cor` ENUM('PRIMARY', 'SUCCESS', 'NEUTRAL', 'WARNING', 'DANGER') NOT NULL DEFAULT 'NEUTRAL',
    `rota` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
