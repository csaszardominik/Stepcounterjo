async function registration(){
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let passwd = document.querySelector('#passwd').value;
    let confirm = document.querySelector('#confirm').value;

    // meg kell szolitani a servert

    let user = {
        name, // name : name,
        email,
        passwd,
        confirm
    }
    const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(user)
    });

    const res = await response.json();

    if(response.status != 200){
        showMessage('danger', 'ERROR', res.error);
    } 
    else
    {
        showMessage('success', 'ok', res.message);
        navigate('views/users/login');
    }
}