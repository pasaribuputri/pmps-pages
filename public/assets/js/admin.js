showAllAdmin()

function createTable(data){
    document.querySelector("tbody").textContent=""
    if(typeof data!=="string"){
        for(let i=0;i<data.length;i++){

        const tr = document.createElement("tr")

        const tdNomor = document.createElement("td")
        tdNomor.textContent = i+1
        tr.appendChild(tdNomor)

        const tdNama = document.createElement("td")
        tdNama.textContent = data[i].nama
        tr.appendChild(tdNama)

        const tdEmail = document.createElement("td")
        tdEmail.textContent = data[i].email
        tr.appendChild(tdEmail)

        const tdDetail = document.createElement("td")
        const anchorDetail = document.createElement("button")
        anchorDetail.className = 'btn-edit'

        const iconEdit = document.createElement("i")
        iconEdit.className = "fa-solid fa-pen-to-square fa-xl"
        anchorDetail.appendChild(iconEdit)

        const btnDelete = document.createElement("button")
        btnDelete.className = 'btn-hapus'

        const iconHapus = document.createElement("i")
        iconHapus.className = "fa-solid fa-trash fa-xl"
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

async function showAllAdmin(){
    await fetch("/api/admin/getAdmin")
    .then((response)=>response.json())
    .then((res)=>{
        if(res.status === "ok"){
            if(res.data.length>0){
                createTable(res.data)
            }else{
                createTable("Data Kosong")
            }
        }
    })
}