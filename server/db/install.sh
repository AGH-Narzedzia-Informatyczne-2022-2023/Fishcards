#!/bin/bash

# Script for installing the Fishcards database

source db.config

psql "postgresql://${DB_USER}:${DB_PWD}@${DB_SERVER}" \
    -c "CREATE USER ${NEW_DB_USER} LOGIN SUPERUSER PASSWORD '${NEW_DB_PWD}';";

psql "postgresql://${DB_USER}:${DB_PWD}@${DB_SERVER}" \
    -c "CREATE DATABASE ${NEW_DB_NAME};"

psql "postgresql://${DB_USER}:${DB_PWD}@${DB_SERVER}" \
    -c "GRANT ALL PRIVILEGES ON DATABASE ${NEW_DB_NAME} TO ${NEW_DB_USER}";

psql "postgresql://${NEW_DB_USER}:${NEW_DB_PWD}@${DB_SERVER}/${NEW_DB_NAME}" \
    -f table-definition.sql \
    -f functions.sql \
    -f sample-data.sql \
    -f testing.sql \
