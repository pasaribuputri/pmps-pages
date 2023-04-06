import express from "express";
import { client } from "../database.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/photos" });

// Tampil Semua Buku
router.get("/getAllBuku", async (req, res) => {
  const result = await client.query("select * from buku");
  res.status(200).json({status : "ok",message: "data ditampilkan", data : result.rows})
});

// Tampil gambar,judul buku
router.get("/getBuku", async (req, res) => {
    console.log(req.query.judul);
  try {
    const result = await client.query(
      `SELECT buku.id_buku, buku.gambar, buku.judul_buku, buku.penulis, genre.nama_genre, penerbit.nama_penerbit, buku.stok, buku.harga, buku.deskripsi FROM buku JOIN genre ON buku.id_genre = genre.id_genre JOIN penerbit ON buku.id_penerbit = penerbit.id_penerbit where judul_buku like '%${req.query.judul}%' ${req.query.penerbit != 0 ? `and penerbit.id_penerbit = ${parseInt(req.query.penerbit)}` : ''} ${req.query.genre != 0 ? `and genre.id_genre = ${parseInt(req.query.genre)}` : ' order by id_buku asc'}`
    );
    res.status(200).json({
      status: "ok",
      message: "Data berhasil ditampilkan",
      data: result.rows,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Tampil Detail Buku
router.get("/getDetailBuku/:id_buku", async (req, res) => {
  try {
    const result = await client.query(
      `SELECT kategori.nama_kategori, buku.id_buku, buku.gambar, buku.judul_buku, buku.penulis, genre.nama_genre, penerbit.nama_penerbit, buku.stok, buku.harga, buku.deskripsi FROM buku JOIN genre ON buku.id_genre = genre.id_genre JOIN penerbit ON buku.id_penerbit = penerbit.id_penerbit JOIN kategori  ON kategori.id_kategori = genre.id_kategori where id_buku = ${req.params.id_buku}`
    );
    res
      .status(200)
      .json({ status: "ok", message: "data terambil", data: result.rows[0] });
  } catch (err) {
    res.status(400).json({ status: "bad request", message: err.message });
  }
});

// search buku by nama buku
// router.get("/getOne/:nama_buku",async(req,res)=>{
//     const result = await client.query(`select * from buku where nama_buku like '%${req.params.nama_buku}%'`)
//     res.send(result.rows)
// })

router.post("/addBuku", upload.single("gambar"), async (req, res) => {
  try {
    await client.query(`insert into buku (harga,id_penerbit,judul_buku,penulis,gambar,id_genre,stok,deskripsi) values ('${req.body.harga}',
        '${req.body.id_penerbit}','${req.body.judul_buku}','${req.body.penulis}','${req.file.filename}',
        '${req.body.id_genre}','${req.body.stok}','${req.body.deskripsi}')`);
    res
      .status(201)
      .json({ status: "created", message: "Data buku berhasil ditambahkan" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/deleteBuku/:id_buku", async (req, res) => {
  try {
    const data = await client.query(
      `delete from buku where id_buku = ${req.params.id_buku}`
    );
    res.status(200).json({ status: "ok", message: "Buku berhasil dihapus" });
  } catch (err) {
    res
      .status(400)
      .json({ status: "Bad request", error: "Data tidak ditemukan" });
  }
});

router.put(
  "/updateBuku/:id_buku",
  upload.single("gambar"),
  async (req, res) => {
    if (req.file) {
      try {
        await client.query(`update buku set harga = '${req.body.harga}',id_penerbit = '${req.body.id_penerbit}',
            judul_buku = '${req.body.judul_buku}',penulis = '${req.body.penulis}',
            gambar = '${req.file.filename}',id_genre = '${req.body.id_genre}',
            stok='${req.body.stok}', deskripsi='${req.body.deskripsi}'`);
        res
          .status(200)
          .json({ status: "OK", message: "Data buku berhasil di update" });
      } catch (err) {
        res.status(400).json(err.message);
      }
    } else {
      try {
        await client.query(`update buku set harga = '${req.body.harga}',id_penerbit = '${req.body.id_penerbit}',
            judul_buku = '${req.body.judul_buku}',penulis = '${req.body.penulis}',id_genre = '${req.body.id_genre}',
            stok='${req.body.stok}', deskripsi='${req.body.deskripsi}'`);
        res
          .status(200)
          .json({ status: "OK", message: "Data buku berhasil di update" });
      } catch (err) {
        res.status(400).json(err.message);
      }
    }
  }
);

export default router;
