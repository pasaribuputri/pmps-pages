showAllPenjualan()
getBuku()

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
            tdTanggal.textContent = data[i].tanggal.slice(0,10)
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

            const tdDetail = document.createElement("td")

            const btnDelete = document.createElement("button")
            btnDelete.className = 'btn-hapus'
            btnDelete.addEventListener('click',()=>{
                deletePenjualan(data[i].id_penjualan)
            })

            const iconHapus = document.createElement("i")
            iconHapus.className = "fa-solid fa-trash fa-xl"
            btnDelete.appendChild(iconHapus)
            tdDetail.appendChild(btnDelete)
            tr.appendChild(tdDetail)

            document.querySelector("tbody").appendChild(tr)
        }
    }else{
        const trNothing = document.createElement("div");
        trNothing.textContent = data
        trNothing.className = 'data-nothing'
        document.querySelector("tbody").appendChild(trNothing)
    }
}

async function showAllPenjualan(){
    await fetch("/api/penjualan/getPenjualan")
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status == "ok"){
            if(res.data.length>0){
                createTable(res.data)
            }else{
                createTable("Data Kosong")
            }
        }
    })
}


async function deletePenjualan(id_penjualan){
    if(confirm("Apakah anda yakin ingin menghapus ?")){
        await fetch(`/api/penjualan/deletePenjualan/${id_penjualan}`,{
            method: "DELETE",
        })
        .then((response)=>response.json())
        .then((res)=>{
            alert(res.message)
            showAllPenjualan()
        })
    }
}