"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var pg_1 = require("pg");
// Настройки подключения к базе данных
var client = new pg_1.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'users_bd',
    password: '123123',
    port: 5432,
});
exports.client = client;
// Подключение к базе данных
client.connect()
    .then(function () { return console.log('Подключено к базе данных'); })
    .catch(function (err) { return console.error('Ошибка подключения', err); });
