let contentBox = document.getElementById('content');

async function navigate(page) {
    contentBox.innerHTML = await (await fetch(`${page}.html`)).text();
}

navigate('views/users/home');