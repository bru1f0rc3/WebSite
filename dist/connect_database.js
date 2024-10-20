"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
// Настройки подключения к базе данных
const client = new pg_1.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'users_bd',
    password: '123123',
    port: 5432,
});
exports.client = client;
// Подключение к базе данных
client.connect()
    .then(() => console.log('Подключено к базе данных'))
    .catch(err => console.error('Ошибка подключения', err));
