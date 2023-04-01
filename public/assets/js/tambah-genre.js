selectOption();


document.querySelector('.btn.simpan').onclick = ((e)=>{
    e.preventDefault()
    const id_kategori = document.getElementById('id-kategori').value;
    const nama_genre = document.getElementById('nama-genre').value;
    if(!nama_genre || !id_kategori){
        return alert("Lengkapi semua data")
    }
    tambahGenre(id_kategori,nama_genre)
})

async function tambahGenre(id_kategori,nama_genre){
    await fetch("/api/genre/addGenre",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_kategori,
            nama_genre,
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        alert(res.message)
        location.href = '/pmps-pages/genre'
    })
}

function selectOption(){
    fetch('/api/kategori/getAllKategori').then((response)=>response.json())
    .then((res)=>{
        createOptions(res.data)
    })
}


function createOptions(data){
    const select = document.getElementById('id-kategori')
    data.map((val)=>{
        const opt = document.createElement("option")
        opt.value = val.id_kategori
        opt.text = val.nama_kategori
        select.appendChild(opt)
    })
}