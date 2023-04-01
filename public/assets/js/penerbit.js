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
            // anchorDetail.addEventListener('click',()={

            // })

            const iconEdit = document.createElement('i')
            iconEdit.className="fa-solid fa-pen-to-square fa-xl"
            anchorDetail.appendChild(iconEdit)

            const btnDelete = document.createElement("button")
            btnDelete.className = 'btn-hapus'
            // btnDelete.addEventListener('click',()=>{

            // })

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
