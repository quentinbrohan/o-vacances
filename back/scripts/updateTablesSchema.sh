#!/bin/bash

## Update tables schema in db
docker-compose exec php bin/console doctrine:schema:update --force