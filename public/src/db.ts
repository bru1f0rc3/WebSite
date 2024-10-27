import config from './cdb';
import Knex from 'knex';

const environment = process.env.NODE_ENV || "development";
const knexConfig = config[environment];

const knex = Knex(knexConfig);

export default knex;