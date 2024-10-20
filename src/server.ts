import express from 'express';
import bodyParser from 'body-parser';
import { client } from './connect_database';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.json());

let dates = new Date();

app.use(express.static(path.join(__dirname, '../')));

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = {
            text: 'INSERT INTO users VALUES(default,$1, $2, $3, 1)',
            values: [email, password, `${dates.getFullYear()}-${String(dates.getMonth() + 1).padStart(2, '0')}-${String(dates.getDate()).padStart(2, '0')}`],
        };

        await client.query(query);
        res.status(200).send('Всё успешно!');
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).send('Ошибка регистрации');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email],
        };

        const result = await client.query(query);

        if (result.rows.length > 0 && result.rows[0].password === password) {
            res.status(200).send('Вы успешно авторизовались!');
        } else {
            res.status(401).send('Вы ввели неправильный логин или пароль');
        }
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).send('Ошибка авторизации');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});