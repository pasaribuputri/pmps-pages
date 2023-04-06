const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const idBuku = urlParams.get('id_buku');

        let allPenerbit = [];
        let allKategori = [];
        let allGenre = [];

        document.getElementById('btn-edit').onclick = () => {
            openModalTambah();
        }

        const deleteBuku = (id) => {
            if (confirm('Apakah anda yakin ingin menghapus?')) {
                fetch('/api/buku/deleteBuku/' + idBuku, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((respon) => {
                        if (respon.status == 'ok') {
                            alert(respon.message)
                            location.href = '/pmps-pages/dashboard'
                        } else {
                            alert(respon.message)
                        }
                    })
            }
        }

        const getDetailBuku = () => {
            fetch('/api/buku/getDetailBuku/' + idBuku)
                .then((res) => res.json())
                .then((respon) => {
                    const buku = respon.data;
                    document.getElementById('gambar-detail-buku').src = `/photos/${buku.gambar}`;
                    document.getElementById('judul-buku').textContent = buku.judul_buku;
                    document.getElementById('penulis-buku').textContent = buku.penulis;
                    document.getElementById('harga-buku').textContent = `Rp ${buku.harga}`;
                    document.getElementById('deskripsi-buku').textContent = buku.deskripsi;
                    document.getElementById('genre-buku').textContent = buku.nama_genre;
                    document.getElementById('penerbit-buku').textContent = buku.nama_penerbit;
                    document.getElementById('kategori-buku').textContent = buku.nama_kategori;
                    document.getElementById('btn-hapus').onclick = () => {
                        deleteBuku(idBuku);
                    }

                    allPenerbit.map((penerbit) => {
                        if (penerbit.nama_penerbit == buku.nama_penerbit) {
                            document.getElementById('tambah-id-penerbit').value = penerbit.id_penerbit;
                        }
                    })

                    allGenre.map((genre) => {
                        if (genre.nama_genre == buku.nama_genre) {
                            document.getElementById('tambah-id-genre').value = genre.id_genre;
                        }
                    })
                    document.getElementById('harga').value = buku.harga
                    document.getElementById('edit-judul-buku').value = buku.judul_buku
                    document.getElementById('penulis').value = buku.penulis
                    document.getElementById('stok').value = buku.stok
                    document.getElementById('edit-deskripsi').value = buku.deskripsi
                })
        }

        const getPenerbit = () => {
            fetch('/api/penerbit/getPenerbit')
                .then((res) => res.json())
                .then((respon) => {
                    if (respon.status == 'ok') {
                        allPenerbit = respon.data;
                        allPenerbit.map((penerbit) => {
                            const opt = document.createElement('option');
                            opt.value = penerbit.id_penerbit;
                            opt.textContent = penerbit.nama_penerbit;
                            document.getElementById('tambah-id-penerbit').appendChild(opt);
                        })

                    }
                })
        }

        const getGenre = () => {
            fetch('/api/genre/getGenre')
                .then((res) => res.json())
                .then((respon) => {
                    if (respon.status == 'ok') {
                        allGenre = respon.data;
                        allGenre.map((genre) => {
                            const opt = document.createElement('option');
                            opt.value = genre.id_genre;
                            opt.textContent = genre.nama_genre;
                            document.getElementById('tambah-id-genre').appendChild(opt);
                        })
                    }
                })
        }

        document.formEditBuku.onsubmit = (e) => {
            e.preventDefault();
            const data = new FormData();
            data.append('harga', document.getElementById('harga').value);
            data.append('id_penerbit', document.getElementById('tambah-id-penerbit').value);
            data.append('judul_buku', document.getElementById('edit-judul-buku').value);
            data.append('penulis', document.getElementById('penulis').value);
            data.append('gambar', document.getElementById('edit-gambar').files[0]);
            data.append('id_genre', document.getElementById('tambah-id-genre').value);
            data.append('stok', document.getElementById('stok').value);
            data.append('deskripsi', document.getElementById('edit-deskripsi').value);

            fetch('/api/buku/updateBuku/' + idBuku, {
                method: 'PUT',
                body: data,
            })
                .then((response) => response.json())
                .then((res) => {
                    alert(res.message)
                    closeModal();
                    location.href = "/pmps-pages/dashboard"
                })
        }

        getGenre();
        getPenerbit();
        getDetailBuku()