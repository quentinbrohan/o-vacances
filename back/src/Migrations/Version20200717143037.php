<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200717143037 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL, CHANGE avatar avatar VARCHAR(128) DEFAULT NULL');
        $this->addSql('ALTER TABLE disponibility CHANGE start_date start_date DATE DEFAULT NULL, CHANGE end_date end_date DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE suggestion CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE activity CHANGE creator_id creator_id INT DEFAULT NULL, CHANGE start_date start_date DATE DEFAULT NULL, CHANGE end_date end_date DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE trip CHANGE start_date start_date DATE DEFAULT NULL, CHANGE end_date end_date DATE DEFAULT NULL, CHANGE location location VARCHAR(255) DEFAULT NULL, CHANGE image image VARCHAR(128) DEFAULT NULL, CHANGE password password VARCHAR(64) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE activity CHANGE creator_id creator_id INT DEFAULT NULL, CHANGE start_date start_date DATE DEFAULT \'NULL\', CHANGE end_date end_date DATE DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE disponibility CHANGE start_date start_date DATE DEFAULT \'NULL\', CHANGE end_date end_date DATE DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE suggestion CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE trip CHANGE start_date start_date DATE DEFAULT \'NULL\', CHANGE end_date end_date DATE DEFAULT \'NULL\', CHANGE location location VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE image image VARCHAR(128) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE password password VARCHAR(64) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, CHANGE avatar avatar VARCHAR(128) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
    }
}
