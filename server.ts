import express from 'express';
import cookieParser from 'cookie-parser';
import knex from './public/src/db';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let dates = new Date();

// -- Статические файлы + Шаблонизатор для Frontend
app.use(express.static(path.join(__dirname, '/public/')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));
//

// -- Маршруты
app.get('/', (req, res) => {
    res.render('index', {return: '/register'});
});

app.get('/page_auth.ejs', (req, res) => {
    if (req.cookies.token) {
        try {
            const tokenObject = JSON.parse(decodeURIComponent(req.cookies.token));
            return res.redirect('/menu');
        } catch (error) {
            console.error('Ошибка раскодирования токена:', error);
        }
    }
    else{
        res.render('page_auth', {return: '/login'});
    }
});

app.get('/menu', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/page_auth.ejs');
    }
    try {
        const decodedToken = JSON.parse(decodeURIComponent(token));
        res.render('journal', { role_id: decodedToken.RoleId });
    } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        res.status(500).send('Ошибка обработки запроса');
    }
})
// -- Маршруты

// -- POST method
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        let query = await knex('User').insert({
            email: email,
            password: password,
            create_date: `${dates.getFullYear()}-${String(dates.getMonth() + 1).padStart(2, '0')}-${String(dates.getDate()).padStart(2, '0')}`
        })
        res.status(200).json(query)

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).send('Ошибка регистрации');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
            let user_who = await knex('User').where({ email }).first();

            if(user_who.email == email && user_who.password == password) {
                let token = JSON.stringify({userId: user_who.user_id, RoleId: user_who.role_id})
                res.cookie('token', token, {secure: false, httpOnly: true});
                return res.redirect('/menu');
            }
            else{
                res.status(404).send({message: "Ошибка авторизация"})
            }
    } catch (error) {
        console.error('Ошибка авторизации:', error);
    }
});

app.post('/menu', async (req,res) => {
    const {role_id} = req.body;
    let token = req.cookies.token;
    if (!token) {
        console.log('Токен отсутсвует...')
    }
    let decode = decodeURIComponent(token);
    const tokenObject = JSON.parse(decode);
    try {
        let htmlContent;
        if (tokenObject.RoleId == 1) {
            htmlContent = '<h1>Хай участник</h1>';
        } else if (tokenObject.RoleId == 2) {
            htmlContent = '<h1>Хай администратор</h1>';
        } else {
            htmlContent = '<h1>Хай гость</h1>';
        }
        res.status(200).send(htmlContent);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ошибка обработки запроса');
    }
})

//

// -- Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
//