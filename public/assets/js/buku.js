selectOptionGenre();
selectOptionkategori();

document.querySelector('.btn.simpan').onclick = ((e)=>{
    e.preventDefault()
    const gambar = document.getElementById("gambar").value
    const judul_buku = document.getElementById("judul-buku").value
    const penulis = document.getElementById("penulis").value
    const id_genre = document.getElementById("id-genre").value
    const id_penerbit = document.getElementById("id-penerbit").value
    const stok =document.getElementById("stok").value
    const harga = document.getElementById("harga").value
    const deskripsi = document.getElementById("deskripsi").value
})

function selectOptionGenre(){
    fetch("/api/genre/getAllGenre").then((response)=>response.json())
    .then((res)=>{
        createOptionsGenre(res.data)
    })
}

function selectOptionkategori(){
    fetch('/api/kategori/getAllKategori').then((response)=>response.json())
    .then((res)=>{
        createOptionsKategori(res.data)
    })
}

function createOptionsGenre(data){
    const select = document.getElementById('id-genre')
    data.map((val)=>{
        const opt = document.createElement("option")
        opt.value = val.id_genre
        opt.text = val.nama_genre
        select.appendChild(opt)
    })
}

function createOptionsKategori(data){
    const select = document.getElementById('id-penerbit')
    data.map((val)=>{
        const opt = document.createElement("option")
        opt.value = val.id_kategori
        opt.text = val.nama_kategori
        select.appendChild(opt)
    })
}