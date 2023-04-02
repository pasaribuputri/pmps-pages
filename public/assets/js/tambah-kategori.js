document.querySelector('.btn.simpan').onclick=((e)=>{
    e.preventDefault()
    const nama_kategori = document.getElementById("nama-kategori").value;
    if(!nama_kategori){
        return alert("Lengkapi Data")
    }
    tambahKategori(nama_kategori)
})

async function tambahKategori(nama_kategori){
    await fetch("/api/kategori/addKategori",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            nama_kategori
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        alert(res.message)
        location.href='/pmps-pages/kategori'
    })
}