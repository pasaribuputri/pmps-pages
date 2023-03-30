import express from "express";
import { client } from "../database.js";

const router = express.Router();

router.get("/getPenjualan",async(req,res)=>{
    const result = await client.query("select * from penjualan")
    res.send(result.rows)
})

router.post("/addPenjualan", async(req,res)=>{
    try{
        await client.query(`insert into penjualan (tanggal,id_buku,jumlah,) values ('${req.body.tanggal}','${req.body.id_buku}','${req.body.jumlah}')`)
        res.status(201).json({status: "created",message: "Data penjualan berhasil ditambahkan"})
    }catch(err){
        res.status(400).json(err.message)}
})

export default router;