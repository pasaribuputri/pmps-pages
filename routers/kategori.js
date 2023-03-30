import express from "express"
import { client } from "../database.js"

const router = express.Router()

router.get("/getKategori",async(req,res)=>{
    const result = await client.query("select * from kategori")
    res.send(result.rows)
})

router.post("/addKategori",async(req,res)=>{
    try{
        await client.query(`insert into kategori (nama_kategori) values ('${req.body.nama_kategori}')`)
        res.status(201).json({status: "created",message: "Data Kategori berhasil ditambahkan"})
    }catch(err){
        res.status(400).json(err.message)
    }
})

export default router;