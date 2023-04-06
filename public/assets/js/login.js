document.login.onsubmit = (e) => {
    e.preventDefault()
    fetch('/api/auth/login', {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: document.login.code.value,
        }),
        method: 'POST'
    }).then((res) => res.json()).then((response) => {
        if (response.status == 'ok') {
            alert(response.message)
            localStorage.setItem('userLogin', response.data.userLogin)
            location.href = '/pmps-pages/dashboard'
        } else {
            alert(response.message);
        }
    })
}