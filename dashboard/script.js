function login() {
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;

    if(username == 'pp_kxb'){
        if(password == 'p1234'){
            window.location = '/datshboard.html'
        }
    }

    if(username == 'jay'){
        if(password == 'j1234'){
            window.location = '/datshboard.html'
        }
    }
}