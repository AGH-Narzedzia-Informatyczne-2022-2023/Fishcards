#!/bin/bash

# Script for uninstalling Fishcards database

source db.config

psql "postgresql://${DB_USER}:${DB_PWD}@${DB_SERVER}" \
    -c "DROP DATABASE IF EXISTS ${NEW_DB_NAME}";
    
psql "postgresql://${DB_USER}:${DB_PWD}@${DB_SERVER}" \
    -c "DROP USER IF EXISTS ${NEW_DB_USER}";
