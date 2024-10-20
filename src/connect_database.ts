import { Client } from 'pg';

// Настройки подключения к базе данных
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'users_bd',
    password: '123123',
    port: 5432,
});

// Подключение к базе данных
client.connect()
    .then(() => console.log('Подключено к базе данных'))
    .catch(err => console.error('Ошибка подключения', err));

export {client}