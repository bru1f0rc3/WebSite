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
var _a, _b;
function message(message, type) {
    return __awaiter(this, void 0, void 0, function* () {
        let message_div = document.getElementById("message");
        message_div.textContent = message;
        message_div.className = `Вы: ${type}`;
    });
}
(_a = document.getElementById('registerform')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const email = document.getElementById('regemail').value;
    const password = document.getElementById('passwordreg').value;
    try {
        const response = yield fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            yield message('Успешная регистрация', 'success');
        }
        else {
            yield message('Ошибка вы ввели некорректно почту', 'error');
        }
    }
    catch (error) {
        console.error('Ошибка регистрации:', error);
        alert('Ошибка регистрации');
    }
}));
(_b = document.getElementById('authform')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const email = document.getElementById('authemail').value;
    const password = document.getElementById('passwordauth').value;
    try {
        const response = yield fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            yield message('Успешно авторизовались', 'success');
        }
        else {
            yield message('Ошибка вы ввели некорректно почту/пароль', 'error');
        }
    }
    catch (error) {
        console.error('Ошибка авторизации:', error);
        alert('Ошибка авторизации');
    }
}));
