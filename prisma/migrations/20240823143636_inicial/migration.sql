-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `permissao` ENUM('DEV', 'ADM', 'TEC', 'USR') NOT NULL DEFAULT 'USR',
    `status` INTEGER NOT NULL DEFAULT 1,
    `ultimologin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `unidade_id` VARCHAR(191) NULL,

    UNIQUE INDEX `usuarios_login_key`(`login`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidades` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `sigla` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `unidades_nome_key`(`nome`),
    UNIQUE INDEX `unidades_sigla_key`(`sigla`),
    UNIQUE INDEX `unidades_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordens` (
    `id` VARCHAR(191) NOT NULL,
    `unidade_id` VARCHAR(191) NOT NULL,
    `andar` INTEGER NOT NULL,
    `sala` VARCHAR(191) NOT NULL,
    `solicitante_id` VARCHAR(191) NOT NULL,
    `tratar_com` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NOT NULL DEFAULT '',
    `data_solicitacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` INTEGER NOT NULL DEFAULT 1,
    `prioridade` INTEGER NOT NULL DEFAULT 1,
    `observacoes` VARCHAR(191) NOT NULL,
    `tipo_id` VARCHAR(191) NOT NULL,
    `categoria_id` VARCHAR(191) NOT NULL,
    `subcategoria_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicos` (
    `id` VARCHAR(191) NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_fim` DATETIME(3) NULL,
    `descricao` VARCHAR(191) NULL,
    `ordem_id` VARCHAR(191) NOT NULL,
    `avaliado_em` DATETIME(3) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `observacao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suspensoes` (
    `id` VARCHAR(191) NOT NULL,
    `servico_id` VARCHAR(191) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `inicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `termino` DATETIME(3) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sugestao_materiais` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sugestao_materiais_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materiais` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `quantidade` DOUBLE NOT NULL,
    `medida` VARCHAR(191) NOT NULL,
    `servico_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tipos_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `tipo_id` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `categorias_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategoria` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `categoria_id` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `subcategoria_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aviso` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `cor` ENUM('PRIMARY', 'SUCCESS', 'NEUTRAL', 'WARNING', 'DANGER') NOT NULL DEFAULT 'NEUTRAL',
    `rota` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `tipo_id` VARCHAR(191) NOT NULL,

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
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_unidade_id_fkey` FOREIGN KEY (`unidade_id`) REFERENCES `unidades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_unidade_id_fkey` FOREIGN KEY (`unidade_id`) REFERENCES `unidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_solicitante_id_fkey` FOREIGN KEY (`solicitante_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `tipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_subcategoria_id_fkey` FOREIGN KEY (`subcategoria_id`) REFERENCES `subcategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servicos` ADD CONSTRAINT `servicos_ordem_id_fkey` FOREIGN KEY (`ordem_id`) REFERENCES `ordens`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suspensoes` ADD CONSTRAINT `suspensoes_servico_id_fkey` FOREIGN KEY (`servico_id`) REFERENCES `servicos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materiais` ADD CONSTRAINT `materiais_servico_id_fkey` FOREIGN KEY (`servico_id`) REFERENCES `servicos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categorias` ADD CONSTRAINT `categorias_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `tipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategoria` ADD CONSTRAINT `subcategoria_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aviso` ADD CONSTRAINT `Aviso_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `tipos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServicoToUsuario` ADD CONSTRAINT `_ServicoToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `servicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServicoToUsuario` ADD CONSTRAINT `_ServicoToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
