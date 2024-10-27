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
function load_window() {
    return __awaiter(this, void 0, void 0, function* () {
        let h_load = yield fetch('/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        });
        if (h_load.ok) {
            let data = yield h_load.text();
            document.getElementById('misc').innerHTML = data;
        }
        else {
            console.error('Ошибка загрузки данных:', h_load.statusText);
        }
    });
}
window.onload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield load_window();
    });
};
