import express from "express";
import { client } from "../database.js";
import multer from "multer";

const router = express.Router();
const upload = multer({dest: "public/photos"})

// Tampil Semua Buku
router.get("/getAllBuku",async(req,res)=>{
    const result = await client.query("select * from buku")
    res.send(result.rows)
})

// Tampil gambar,judul buku
router.get("/getBuku",async(req,res)=>{
    const result = await client.query(`SELECT buku.gambar, buku.judul_buku, buku.penulis, genre.nama_genre, penerbit.nama_penerbit, buku.stok, buku.harga, buku.deskripsi 
                    FROM buku JOIN genre ON buku.id_genre = genre.id_genre JOIN penerbit ON buku.id_penerbit = penerbit.id_penerbit`)
    res.send(result.rows)
})

// search buku by nama buku
// router.get("/getOne/:nama_buku",async(req,res)=>{
//     const result = await client.query(`select * from buku where nama_buku like '%${req.params.nama_buku}%'`)
//     res.send(result.rows)
// })


router.post("/addBuku",upload.single("photo"), async(req,res)=>{
    try{
        await client.query(`insert into buku (harga,id_penerbit,judul_buku,penulis,gambar,id_genre,stok) values ('${req.body.harga}',
        '${req.body.id_penerbit}','${req.file.filename}','${req.body.penulis}',
        '${req.body.harga}','${req.body.id_genre}','${req.body.stok}')`);
        res.status(201).json({status: "created",message: "Data buku berhasil ditambahkan"})
    }catch (err){
        res.status(400).json(err.message)
    }
})

router.delete("/deleteBuku/:id_buku",async(req,res)=>{
    const data = await client.query(`delete from buku where id_buku = ${req.params.id_buku}`)
    if(data.length){
         try{
            res.status(200).json({status: 'OK',message: "Buku berhasil dihapus"})
        }catch(err){
            res.status(400).send(err.message)
        } 
    }else{
        return res.status(400).json({status: 'Bad request',error: 'Data tidak ditemukan'})
    }
})

router.put("/updateBuku/:id_buku",upload.single("photo"),async(req,res)=>{
    try{
        await client.query(`update buku set harga = '${req.body.harga}',id_penerbit = '${req.body.id_penerbit}',
        judul_buku = '${req.body.judul_buku}',penulis = '${req.body.penulis}',
        gambar = '${req.file.filename}',id_genre = '${req.body.id_genre}',
        stok='${req.body.stok}'`)
        res.status(200).json({status: "OK",message: "Data buku berhasil di update"})
    }catch{
        res.status(400).json(err.message)
    }
})

export default router;