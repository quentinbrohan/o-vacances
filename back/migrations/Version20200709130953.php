<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200709130953 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_disponibility (user_id INT NOT NULL, disponibility_id INT NOT NULL, INDEX IDX_D6353F30A76ED395 (user_id), INDEX IDX_D6353F3031528CB4 (disponibility_id), PRIMARY KEY(user_id, disponibility_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_disponibility ADD CONSTRAINT FK_D6353F30A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_disponibility ADD CONSTRAINT FK_D6353F3031528CB4 FOREIGN KEY (disponibility_id) REFERENCES disponibility (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE activity CHANGE creator_id creator_id INT DEFAULT NULL, CHANGE start_date start_date DATE DEFAULT NULL, CHANGE end_date end_date DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE disponibility CHANGE start_date start_date DATE DEFAULT NULL, CHANGE end_date end_date DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE suggestion CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE trip CHANGE end_date end_date DATE DEFAULT NULL, CHANGE location location VARCHAR(255) DEFAULT NULL, CHANGE picture picture VARCHAR(128) DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE avatar avatar VARCHAR(128) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user_disponibility');
        $this->addSql('ALTER TABLE activity CHANGE creator_id creator_id INT DEFAULT NULL, CHANGE start_date start_date DATE DEFAULT \'NULL\', CHANGE end_date end_date DATE DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE disponibility CHANGE start_date start_date DATE DEFAULT \'NULL\', CHANGE end_date end_date DATE DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE suggestion CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE trip CHANGE end_date end_date DATE DEFAULT \'NULL\', CHANGE location location VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE picture picture VARCHAR(128) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE user CHANGE avatar avatar VARCHAR(128) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
    }
}
