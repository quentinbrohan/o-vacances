#!/bin/sh
echo "ENTER DATABASE USER NAME:"
read dbuser
echo "ENTER DATASE PASSWORD:"
read dbpassword
mysqldump -u $dbuser -p$dbpassword $dbname>"ovacances.sql"