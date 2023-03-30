import express from "express";
import { client } from "../database.js";

const router = express.Router();

router.get("/getGenre",async(req,res)=>{
    const result = await client.query("select * from genre")
    res.send(result.rows)
})

router.post("/addGenre",async(req,res)=>{
    await client.query(`insert into genre (id_kategori,nama_genre) values ('${req.body.id_kategori}','${req.body.nama_genre}')`)
    res.status(201).json({status: "created",message: "Data genre berhasil ditambahkan"})
})

export default router;