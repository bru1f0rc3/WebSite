"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_database_1 = require("./connect_database");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
let dates = new Date();
app.use(express_1.default.static(path_1.default.join(__dirname, '../')));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const query = {
            text: 'INSERT INTO users VALUES(default,$1, $2, $3, 1)',
            values: [email, password, `${dates.getFullYear()}-${String(dates.getMonth() + 1).padStart(2, '0')}-${String(dates.getDate()).padStart(2, '0')}`],
        };
        yield connect_database_1.client.query(query);
        res.status(200).send('Всё успешно!');
    }
    catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).send('Ошибка регистрации');
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const query = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email],
        };
        const result = yield connect_database_1.client.query(query);
        if (result.rows.length > 0 && result.rows[0].password === password) {
            res.status(200).send('Вы успешно авторизовались!');
        }
        else {
            res.status(401).send('Вы ввели неправильный логин или пароль');
        }
    }
    catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).send('Ошибка авторизации');
    }
}));
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
