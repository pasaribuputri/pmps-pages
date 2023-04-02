document.querySelector('.btn.simpan').onclick=((e)=>{
    e.preventDefault()
    const nama_penerbit = document.getElementById('nama-penerbit').value;
    if(!nama_penerbit){
        return alert("Lengkapi Data")
    }
    tambahPenerbit(nama_penerbit)
})

async function tambahPenerbit(nama_penerbit){
    await fetch("/api/penerbit/addPenerbit",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            nama_penerbit,
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        alert(res.message)
        location.href='/pmps-pages/penerbit'
    })
}