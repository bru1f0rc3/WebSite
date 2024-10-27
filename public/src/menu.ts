async function load_window() {
    let h_load = await fetch('/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    });

    if (h_load.ok) {
        let data = await h_load.text();
        (document.getElementById('misc') as HTMLElement).innerHTML = data;
    } else {
        console.error('Ошибка загрузки данных:', h_load.statusText);
    }
}

window.onload = async function() {
    await load_window();
};