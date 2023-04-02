function createTable(data){
    document.querySelector("tbody").textContent=''
    if(typeof data!=="string"){
        for(let i=0;i<data.length;i++){
            const tr = document.createElement("tr")

            const tdNomor = document.createElement("td")
            tdNomor.textContent=i+1
            tr.appendChild(tdNomor)

            const tdId = document.createElement("td")
            tdId.textContent = data[i].id_penjualan
            tr.appendChild(tdId)

            const tdTanggal = document.createElement("td")
            tdTanggal.textContent = data[i].tanggal
            tr.appendChild(tdTanggal)

            const tdJudul = document.createElement("td")
            tdJudul.textContent = data[i].judul_buku
            tr.appendChild(tdJudul)

            const tdHarga = document.createElement("td")
            tdHarga.textContent = data[i].harga
            tr.appendChild(tdHarga)

            const tdJumlah = document.createElement("td")
            tdJumlah.textContent = data[i].jumlah
            tr.appendChild(tdJumlah)

            const btnDelete = document.createElement("button")
            btnDelete.className = 'btn-hapus'
            btnDelete.addEventListener('click',()=>{

            })

            const iconHapus = document.createElement("i")
            iconHapus.className = "fa-solid fa-trash fa-xl"
            btnDelete.appendChild(iconHapus)
            tr.appendChild(btnDelete)

            document.querySelector("tbody").appendChild(tr)
        }
    }
}