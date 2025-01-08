const path = require('path');
require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: 'postgres',
    dialect: 'postgres',
    migrationStorage: 'json',
    migrations: {
      path: path.resolve(__dirname, '../src/infrastructure/database/migrations'),
    },
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: 'postgres',
    dialect: 'postgres',
    migrationStorage: 'json',
    migrations: {
      path: path.resolve(__dirname, '../src/infrastructure/database/migrations'),
    },
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: 'postgres',
    dialect: 'postgres',
    migrationStorage: 'json',
    migrations: {
      path: path.resolve(__dirname, '../dist/infrastructure/database/migrations'), // Caminho transpilado
    },
  },
};
