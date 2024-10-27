async function message(message: string, type: string){
    let message_div = document.getElementById("message") as HTMLDivElement;
    message_div.textContent = message;
    message_div.className = `Вы: ${type}`;
}

document.getElementById('registerform')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('regemail') as HTMLInputElement).value;
    const password = (document.getElementById('passwordreg')as HTMLInputElement).value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            await message('Успешная регистрация', 'success');
        }
        else{
            await message('Ошибка вы ввели некорректно почту', 'error');
        }

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        alert('Ошибка регистрации');
    }
});

document.getElementById('authform')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('authemail')as HTMLInputElement).value;
    const password = (document.getElementById('passwordauth')as HTMLInputElement).value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            await message('Успешно авторизовались', 'success');
        }
        else{
            await message('Ошибка вы ввели некорректно почту/пароль', 'error');
        }
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        alert('Ошибка авторизации');
    }
});