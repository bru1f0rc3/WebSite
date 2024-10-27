"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cdb_1 = __importDefault(require("./cdb"));
const knex_1 = __importDefault(require("knex"));
const environment = process.env.NODE_ENV || "development";
const knexConfig = cdb_1.default[environment];
const knex = (0, knex_1.default)(knexConfig);
exports.default = knex;
