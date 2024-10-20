// src/app.js
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

        const result = await response.text();
        alert(result);
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

        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        alert('Ошибка авторизации');
    }
});