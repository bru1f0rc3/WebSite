"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Настройки подключения к базе данных
let config = {
    development: {
        client: "pg",
        connection: {
            host: "127.0.0.1",
            user: "postgres",
            password: "123123",
            database: "users_bd",
        },
        migrations: {
            tableName: "users_migrations"
        }
    }
};
exports.default = config;
