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

async function login(){
    let email = document.querySelector('#email').value;
    let passwd = document.querySelector('#passwd').value;

    let user = {
        email,
        passwd
    }

    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            "Content-Type" : "Application/json"
        },
        body: JSON.stringify(user)
    });

    let res = await response.json();

    if(response.status != 200){
        showMessage('danger', 'ERROR', res.error);
    } 
    else
    {
        showMessage('success', 'ok', res.message);
        console.log(res.loggedUser);
        sessionStorage.setItem('SCU', JSON.stringify(res.loggedUser));
        storeUser(res.loggedUser);
        loginCheck();
        navigate('views/users/steps');
    }
}

function logout(){
    clearUser();
    loginCheck();
    navigate('views/users/login');
}

function storeUser(user){
    sessionStorage.setItem('SCU', JSON.stringify(user));
}

function loadUser(){
    let user =  JSON.parse(sessionStorage.getItem('SCU'));
    return user;
}

function clearUser(){
    sessionStorage.removeItem('SCU');
}

function loginCheck(){
    if(user = loadUser()){  // két művelet egyben, 1. Ellenőrizzük a loadUser - el a sessionStorage kulcsot, majd 2. a visszaadott értéket eltároljuk a user változóban
        if(user.role == 'admin'){
            // alert('Admin belépve');
            setMenuItems('admin');
            navigate('views/admin/dashboard');
        } else  {
            // alert('User belépve');
            setMenuItems('user');
            navigate('views/users/steps');
        }
    } else{
        // alert('Nincs belépve'); 
        setMenuItems('');
        navigate('views/users/login');
    }
}

function setMenuItems(param){
    let baseMenu = document.querySelector('#baseMenu');
    let userMenu = document.querySelector('#userMenu');
    let adminMenu = document.querySelector('#adminMenu');
    switch(param){
        case 'admin' : {
            baseMenu.classList.add('hide');
            userMenu.classList.add('hide');
            adminMenu.classList.remove('hide');
            break;
        }
        case 'user' : {
            baseMenu.classList.add('hide');
            adminMenu.classList.add('hide');
            userMenu.classList.remove('hide');
            break;
        }
        default : {
            userMenu.classList.add('hide');
            adminMenu.classList.add('hide');
            baseMenu.classList.remove('hide');
            break;
        }
    }
}

async function updateProfile(){
    // hf
}

async function updatePassword(){
    let oldpass = document.querySelector('#oldpass');
    let newpass = document.querySelector('#newpass');
    let confirm = document.querySelector('#confirm');

    let data = {
        oldpass : oldpass.value,
        newpass : newpass.value,
        confirm : confirm.value
    }

    let uid = loadUser() ? loadUser().ID : 0;

    const response = await fetch(`http://localhost:3000/users/${uid}/passmod`, {
        method: 'POST',
        headers: {
            "Content-Type" : "Application/json"
        },
        body: JSON.stringify(data)
    });

    let res = await response.json();

    if(response.status != 200){
        showMessage('danger', 'ERROR', res.error);
    } else{
        showMessage('success', 'ok', res.message);
        oldpass.value = '';
        newpass.value = '';
        confirm.value = '';
    }
}