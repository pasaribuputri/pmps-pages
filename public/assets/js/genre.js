showAllGenre()

function createTable(data){
    document.querySelector("tbody").textContent=''
    if(typeof data!=="string"){
        for(let i=0;i<data.length;i++){
            const tr = document.createElement("tr")

            const tdNomor = document.createElement("td")
            tdNomor.textContent = i+1;
            tr.appendChild(tdNomor)

            const tdGenre = document.createElement("td")
            tdGenre.textContent = data[i].nama_genre
            tr.appendChild(tdGenre)

            const tdKategori = document.createElement("td")
            tdKategori.textContent = data[i].nama_kategori
            tr.appendChild(tdKategori)

            const tdDetail = document.createElement("td")
            const anchorDetail = document.createElement("button")
            anchorDetail.className = 'btn-edit'
            // anchorDetail.addEventListener('click',()={
            //     location.href=``
            // })

            const iconEdit = document.createElement('i')
            iconEdit.className="fa-solid fa-pen-to-square fa-xl"
            anchorDetail.appendChild(iconEdit)

            const btnDelete = document.createElement("button")
            btnDelete.className = 'btn-hapus'
            btnDelete.addEventListener('click',()=>{
                deleteGenre(data[i].id_genre)
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

async function showAllGenre(){
    await fetch("/api/genre/getGenre")
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

async function deleteGenre(id_genre){
    if(confirm('Apakah anda yakin ingin menghapus?')){
        await fetch(`/api/genre/deleteGenre/${id_genre}`,{
            method: "DELETE",
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === 'Ok'){
                alert(res.message)
                showAllGenre()
            }else{
                alert('eror')
            }
        })
    }
}