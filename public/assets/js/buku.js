selectOptionPenerbit();
selectOptionGenre();
selectOptionGenre1();
selectOptionPenerbit1();

document.querySelector(".btn.simpan").onclick = (e) => {
  e.preventDefault();
  const harga = document.getElementById("harga").value;
  const id_penerbit = document.getElementById("tambah-id-penerbit").value;
  const judul_buku = document.getElementById("judul-buku").value;
  const penulis = document.getElementById("penulis").value;
  const gambar = document.getElementById("gambar").files[0];
  const id_genre = document.getElementById("tambah-id-genre").value;
  const stok = document.getElementById("stok").value;
  const deskripsi = document.getElementById("deskripsi").value;
  if (
    !harga ||
    !id_penerbit ||
    !judul_buku ||
    !penulis ||
    !gambar ||
    !id_genre ||
    !stok ||
    !deskripsi
  ) {
    return alert("Lengkapi semua data!!");
  }
  tambahBuku(
    harga,
    id_penerbit,
    judul_buku,
    penulis,
    gambar,
    id_genre,
    stok,
    deskripsi
  );
};

async function tambahBuku(
  harga,
  id_penerbit,
  judul_buku,
  penulis,
  gambar,
  id_genre,
  stok,
  deskripsi
) {
  const data = new FormData();
  data.append("harga", harga);
  data.append("id_penerbit", id_penerbit);
  data.append("judul_buku", judul_buku);
  data.append("penulis", penulis);
  data.append("gambar", gambar);
  data.append("id_genre", id_genre);
  data.append("stok", stok);
  data.append("deskripsi", deskripsi);
  console.log(data);
  await fetch("/api/buku/addBuku", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((res) => {
      alert(res.message);
      location.href = "/pmps-pages/dashboard";
    });
}

function selectOptionGenre() {
  fetch("/api/genre/getAllGenre")
    .then((response) => response.json())
    .then((res) => {
      createOptionsGenre(res.data);
    });
}

function createOptionsGenre(data) {
  console.log(data);
  const select = document.getElementById("cari-id-genre");
  data.map((val) => {
    const opt = document.createElement("option");
    opt.value = val.id_genre;
    opt.text = val.nama_genre;
    select.appendChild(opt);
  });
}

function selectOptionPenerbit() {
  fetch("/api/penerbit/getPenerbit")
    .then((response) => response.json())
    .then((res) => {
      createOptionsPenerbit(res.data);
    });
}

function createOptionsPenerbit(data) {
  console.log(data);
  const select = document.getElementById("cari-id-penerbit");
  data.map((val) => {
    const opt = document.createElement("option");
    opt.value = val.id_penerbit;
    opt.text = val.nama_penerbit;
    select.appendChild(opt);
  });
}

// function selectOptionKategori(){
//     fetch('/api/kategori/getAllKategori').then((response)=>response.json())
//     .then((res)=>{
//         createOptionkategori(res.data)
//     })
// }

function createOptionkategori(data) {
  console.log(data);
  const select = document.getElementById("id-kategori");
  data.map((val) => {
    const opt = document.createElement("option");
    opt.value = val.id_kategori;
    opt.text = val.nama_kategori;
    select.appendChild(opt);
  });
}
// ///////////

function selectOptionGenre1() {
  fetch("/api/genre/getAllGenre")
    .then((response) => response.json())
    .then((res) => {
      createOptionsGenre1(res.data);
    });
}

function createOptionsGenre1(data) {
  console.log(data);
  const select = document.getElementById("tambah-id-genre");
  data.map((val) => {
    const opt = document.createElement("option");
    opt.value = val.id_genre;
    opt.text = val.nama_genre;
    select.appendChild(opt);
  });
}

function selectOptionPenerbit1() {
  fetch("/api/penerbit/getPenerbit")
    .then((response) => response.json())
    .then((res) => {
      createOptionsPenerbit1(res.data);
    });
}

function createOptionsPenerbit1(data) {
  console.log(data);
  const select = document.getElementById("tambah-id-penerbit");
  data.map((val) => {
      const opt = document.createElement("option");
      opt.value = val.id_penerbit;
      opt.text = val.nama_penerbit;
      select.appendChild(opt);
    });
}

const getBuku = () => {
  fetch(
    "/api/buku/getBuku?" +
      new URLSearchParams({
        judul: document.getElementById("cari-judul-buku").value,
        penerbit: document.getElementById("cari-id-penerbit").value,
        genre: document.getElementById("cari-id-genre").value,
      })
  )
    .then((res) => res.json())
    .then((respon) => {
      console.log(respon);
      if (respon.status == "ok") {
        const buku = respon.data;
        const cardContainer = document.querySelector(".container-card");
        cardContainer.replaceChildren();
        if (buku.length > 0) {
          buku.map((buku) => {
            //Membuat div pembungkus
            const cardBook = document.createElement("div");
            cardBook.className = "card-book";
            cardBook.onclick = () => {
              window.location.href = `/pmps-pages/dashboard/detailBook/?id_buku=${buku.id_buku}`;
            };

            //Membuat image
            const gambarBuku = document.createElement("img");
            gambarBuku.src = `/photos/${buku.gambar}`;
            gambarBuku.alt = buku.gambar;

            //Membuat label judul buku
            const judulBuku = document.createElement("p");
            judulBuku.className = "label-judul";
            judulBuku.textContent = buku.judul_buku;

            //Membuat label harga
            const hargaBuku = document.createElement("p");
            hargaBuku.className = "label-harga";
            hargaBuku.textContent = `Rp. ${buku.harga}`;

            cardBook.appendChild(gambarBuku);
            cardBook.appendChild(judulBuku);
            cardBook.appendChild(hargaBuku);
            cardContainer.appendChild(cardBook);
          });
        } else {
            const nothingBook = document.createElement('div');
            nothingBook.className = 'nothing-book';
            const teksNothing = document.createElement('p');
            teksNothing.textContent = 'Buku Tidak Ditemukan...';
            nothingBook.appendChild(teksNothing);
            cardContainer.appendChild(nothingBook);
        }
      }
    });
};
getBuku();
