import express from "express";
import { client } from "../database.js";
import multer from "multer";

const router = express.Router();
const upload = multer({dest: "public/photos"})

router.get("/getBuku",async(req,res)=>{
    const result = await client.query("select * from buku")
    res.send(result.rows)
})

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

export default router;