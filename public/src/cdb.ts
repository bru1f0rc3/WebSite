import type { Knex } from 'knex';

// Настройки подключения к базе данных
let config: { [key: string]: Knex.Config} = {
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

export default config;