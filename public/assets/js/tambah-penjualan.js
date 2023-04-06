selectOptionBuku()
function selectOptionBuku(){
    fetch("/api/buku/getAllBuku")
    .then((response)=>response.json())
    .then((res)=>{
        createOptionsBuku(res.data)
    })
}

function createOptionsBuku(data){
    const select = document.getElementById('id_buku');
    data.map((val)=>{
        const opt = document.createElement("option")
        opt.value = val.id_buku
        opt.text = val.judul_buku
        select.appendChild(opt)
    })
}

document.querySelector(".btn.simpan").onclick   = ((e)=>{
    e.preventDefault()
    const tanggal = document.getElementById("tanggal").value
    const id_buku = document.getElementById("id_buku").value
    const jumlah = document.getElementById("jumlah").value
    if(!tanggal || !id_buku || !jumlah){
        return alert("lengkapi semua data")
    }
    tambahPenjualan(tanggal,id_buku,jumlah)
})

async function tambahPenjualan(tanggal,id_buku,jumlah){
    await fetch("/api/penjualan/addPenjualan",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            tanggal,
            id_buku,
            jumlah
        })
    })
    .then((response)=> response.json())
    .then((res)=>{
        alert(res.message)
        location.href = '/pmps-pages/penjualan'
    })
}