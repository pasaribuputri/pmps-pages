document.login.onsubmit = (e) =>{
    e.preventDefault()
    const email = document.getElementById("email")
    const kode_akses = document.getElementById("password")
    fetch("/api/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            kode_akses
        })
    }).then(async(response)=>{
        if(response.ok){
            location.href = "/pmps-pages/dashboard"
        }else{
            const message = await response.text()
            alert(message)
        }
    })
}