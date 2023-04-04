showAllKategori()

document.querySelector(".btn-cari").onclick = (async(e)=>{
    e.preventDefault()
    const cari = document.querySelector(".input-pencarian").value
    if(cari){
        showCariKategori(cari)
    }else{
        showAllKategori()
    }
})

async function createTable(data){
    document.querySelector("tbody").textContent=''
    if(typeof data!=="string"){
        for(let i=0;i<data.length;i++){
            const tr = document.createElement("tr")

            const tdNomor = document.createElement("td")
            tdNomor.textContent = i+1;
            tr.appendChild(tdNomor)

            const tdKategori = document.createElement("td")
            tdKategori.textContent = data[i].nama_kategori
            tr.appendChild(tdKategori)

            const tdDetail = document.createElement("td")
            const anchorDetail = document.createElement("button")
            anchorDetail.className = 'btn-edit'
            anchorDetail.addEventListener('click',()=>{
                editKategori(data[i].id_kategori)
            })

            const iconEdit = document.createElement('i')
            iconEdit.className="fa-solid fa-pen-to-square fa-xl"
            anchorDetail.appendChild(iconEdit)

            const btnDelete = document.createElement("button")
            btnDelete.className = 'btn-hapus'
            btnDelete.addEventListener('click',()=>{
                 deleteKategori(data[i].id_kategori)
            })

            const iconHapus = document.createElement('i')
            iconHapus.className= "fa-solid fa-trash fa-xl"
            btnDelete.appendChild(iconHapus)
            tdDetail.appendChild(anchorDetail)
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

async function showCariKategori(cari){
    await fetch(`/api/kategori/getOne/${cari}`)
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status == "ok"){
            createTable(res.data)
        }else{
            createTable()
        }
    })
}

async function showAllKategori(){
    await fetch("/api/kategori/getAllKategori")
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status === 'ok'){
            if(res.data.length>0){
                createTable(res.data)
            }else{
                createTable("Data Kosong")
            }
        }
    })
}

async function deleteKategori(id_kategori){
    if(confirm(`Apakah anda yakin ingin menghapus data dengan id kategori ${id_kategori}`)){
        await fetch(`/api/kategori/deleteKategori/${id_kategori}`,{
            method: "DELETE",
        })
        .then((response)=>response.json())
        .then((res)=>{
                alert(res.message)
                showAllKategori()
        })
    }
}

let id_kategori;


function editKategori(id){
    openModalEditKategori()
    id_kategori = id;
}

document.formEditKategori.onsubmit = async (e) => {
    e.preventDefault();
    const nama_kategori = document.getElementById("edit-nama-kategori").value
    await fetch("/api/kategori/updateKategori/"+ id_kategori,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nama_kategori
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status == "Ok"){
            document.getElementById("edit-nama-kategori").value = ''
            alert(res.message)
            closeModalEditKategori()
            showAllKategori()
        }
    })
}

