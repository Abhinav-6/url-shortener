-- CreateTable
CREATE TABLE `Url` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `original_url` VARCHAR(191) NOT NULL,
    `short_url` VARCHAR(191) NOT NULL,
    `click` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Url_short_url_key`(`short_url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
