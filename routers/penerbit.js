import express from "express";
import { client } from "../database.js";

const router = express.Router();

router.get("/getPenerbit",async(req,res)=>{
    const result = await client.query("select * from penerbit")
    res.send(result.rows)
})

router.post("/addPenerbit",async(req,res)=>{
    try{
        await client.query(`insert into penerbit (nama_penerbit) values ('${req.body.nama_penerbit}')`)
        res.status(201).json({status: "created",message: "Data penerbit berhasil ditambahkan"})
    }catch{
        res.status(400).json(err.message)
    }
})

router.delete("/deletePenerbit/:id_penerbit",async(req,res)=>{
        try{
            await client.query(`delete from penerbit where id_penerbit = ${req.params.id_penerbit}`)
            res.status(200).json({status: 'Ok',message: "Penerbit berhasil di hapus"})
        }catch (err){
            res.status(400).json(err.message)
        }
})

router.put("/updatePenerbit/:id_penerbit",async(req,res)=>{
    try{
        await client.query(`update penerbit set nama_penerbit = '${req.body.nama_penerbit}'  where id_penerbit = ${req.params.id_penerbit}`)
        res.status(200).json({status: "Ok",message: "Data penjualan berhasil di update"})
    }catch(err){
        res.status(400).json(err.message)
    }
})

export default router;