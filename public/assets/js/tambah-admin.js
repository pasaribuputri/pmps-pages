document.querySelector('.btn.simpan').onclick = ((e)=>{
    e.preventDefault()
    const nama = document.getElementById("nama").value
    const kode_akses = document.getElementById("kode-akses").value
    const email = document.getElementById("email").value
    if(!nama||!kode_akses||!email){
        return alert("Lengkapi semua data")
    }
    tambahAdmin(nama,kode_akses,email)
}) 

async function tambahAdmin(nama,kode_akses,email){
    await fetch("/api/admin/addAdmin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nama,
            kode_akses,
            email,
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        alert(res.message)
        location.href='/pmps-pages/admin'
    })
}