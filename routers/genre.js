import express from "express";
import { client } from "../database.js";

const router = express.Router();

// tampil semua genre
router.get("/getAllGenre",async(req,res)=>{
    const result = await client.query("select * from genre")
    // res.send(result.row)
    res.status(200).json({status: "ok",message: "Data genre berhasil ditampilkan",data:result.rows})


})

// tampil nama genre, nama kategori
router.get("/getGenre",async(req,res)=>{
    const result = await client.query("select id_genre,nama_genre, nama_kategori from genre inner join kategori on genre.id_kategori = kategori.id_kategori order by id_genre asc")
    res.status(200).json({status: "ok",message: "Data genre berhasil ditampilkan",data:result.rows})
    // res.send(result.rows)
})

// serach genre

router.get("/getOne/:nama_genre",async(req,res)=>{
    const result = await client.query(`select * from genre where nama_genre like '%${req.params.nama_genre}%'`);
    res.status(200).json({status: "ok",message: "data ditampilkan",data:result.rows})
});

router.post("/addGenre",async(req,res)=>{
    await client.query(`insert into genre (id_kategori,nama_genre) values ('${req.body.id_kategori}','${req.body.nama_genre}')`)
    res.status(201).json({status: "created",message: "Data genre berhasil ditambahkan"})
})

router.delete("/deleteGenre/:id_genre",async(req,res)=>{
    try{
        await client.query(`delete from genre where id_genre = ${req.params.id_genre}`)
        res.status(200).json({status: 'Ok',message: "Genre berhasil di hapus"})
    }catch (err){
        res.status(400).json(err.message)
    }
})

router.put("/updateGenre/:id_genre",async(req,res)=>{
    try{
        await client.query(`update genre set id_kategori = '${req.body.id_kategori}', nama_genre = '${req.body.nama_genre}'  where id_genre = ${req.params.id_genre}`)
        res.status(200).json({status: "Ok",message: "Data genre berhasil di update"})
    }catch(err){
        res.status(400).json(err.message)
    }
})

export default router;