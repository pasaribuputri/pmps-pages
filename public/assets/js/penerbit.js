showAllPenerbit()

function createTable(data){
    document.querySelector("tbody").textContent=''
    if(typeof data!=="string"){
        for(let i=0;i<data.length;i++){
            const tr = document.createElement("tr")

            const tdNomor = document.createElement("td")
            tdNomor.textContent = i+1;
            tr.appendChild(tdNomor)

            const tdPenerbit = document.createElement("td")
            tdPenerbit.textContent = data[i].nama_penerbit
            tr.appendChild(tdPenerbit)

            const tdDetail = document.createElement("td")
            const anchorDetail = document.createElement("button")
            anchorDetail.className = 'btn-edit'
            anchorDetail.addEventListener('click',()=>{
                editPenerbit(data[i].id_penerbit)
            })

            const iconEdit = document.createElement('i')
            iconEdit.className="fa-solid fa-pen-to-square fa-xl"
            anchorDetail.appendChild(iconEdit)

            const btnDelete = document.createElement("button")
            btnDelete.className = 'btn-hapus'
            btnDelete.addEventListener('click',()=>{
                deletePenerbit(data[i].id_penerbit)
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

async function showAllPenerbit(){
    await fetch("/api/penerbit/getPenerbit")
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

async function deletePenerbit(id_penerbit){
    if(confirm("Apakah anda yakin ingin menghapus data?")){
        await fetch(`/api/penerbit/deletePenerbit/${id_penerbit}`,{
            method: "DELETE",
        })
        .then((response)=>response.json())
        .then((res)=>{
            alert(res.message)
            showAllPenerbit()
        })
    }
}

let id_penerbit;

function editPenerbit(id){
    openModalEditPenerbit()
    id_penerbit = id;
}

document.formEditPenerbit.onsubmit = async(e)=>{
    e.preventDefault()
    const nama_penerbit = document.getElementById("edit-nama-penerbit").value
    await fetch("/api/penerbit/updatePenerbit/"+id_penerbit,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nama_penerbit
        })
    })
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status == "Ok"){
            document.getElementById("edit-nama-penerbit").value = ''
            alert(res.message)
            closeModalEditPenerbit()
            showAllPenerbit()
        }
    })
}