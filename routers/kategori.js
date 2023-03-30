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

router.delete("/deleteKategori/:id_kategori",async(req,res)=>{
        try{
            await client.query(`delete from kategori where id_kategori = ${req.params.id_kategori}`)
            res.status(200).json({status: 'Ok',message: "Kategori berhasil di hapus"})
        }catch (err){
            res.status(400).json(err.message)
        }
})

router.put("/updateKategori/:id_kategori",async(req,res)=>{
    try{
        await client.query(`update kategori set nama_kategori = '${req.body.nama_kategori}'  where id_kategori = ${req.params.id_kategori}`)
        res.status(200).json({status: "Ok",message: "Data kategori berhasil di update"})
    }catch(err){
        res.status(400).json(err.message)
    }
})

export default router;