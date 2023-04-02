import express from "express";
import { client } from "../database.js";

const router = express.Router();

router.get("/getAllPenjualan",async(req,res)=>{
    try{
        const result = await client.query("select * from penjualan")
        res.status(200).json({status: "ok",message: "Data berhasil ditampilkan",data: result.rows})
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.get("/getPenjualan",async(req,res)=>{
    const result = await client.query("select penjualan.id_penjualan, penjualan.tanggal,buku.judul_buku,buku.harga,penjualan.jumlah from penjualan join buku on penjualan.id_buku = buku.id_buku")
    // res.send(result.rows)
    res.status(200).json({status: "ok",message: "Data Penjualan berhasil ditampilkan",data: result.rows})
})

router.post("/addPenjualan", async(req,res)=>{
    try{
        await client.query(`insert into penjualan (tanggal,id_buku,jumlah) values ('${req.body.tanggal}','${req.body.id_buku}','${req.body.jumlah}')`)
        res.status(201).json({status: "created",message: "Data penjualan berhasil ditambahkan"})
    }catch(err){
        res.status(400).json(err.message)}
})

router.delete("/deletePenjualan/:id_penjualan",async(req,res)=>{
    const data = await client.query("select * from penjualan")
    if(data.length){
        try{
            await client.query(`delete from penjualan where id_penjualan = '${req.params.id_penjualan}'`)
            res.status(200).json({status: 'Ok',message: "Penjualan berhasil di hapus"})
        }catch (err){
            res.status(400).json(err.message)
        }
    }else{
        return res.status(400).json({status:'Bad Request',error: "Data tidak ditemukan"})
    }
})

router.put("/updatePenjualan/:id_penjualan",async(req,res)=>{
    try{
        await client.query(`update penjualan set tanggal = '${req.body.tanggal}',id_buku = '${req.body.id_buku}',
        jumlah = '${req.body.jumlah}' where id_penjualan = ${req.params.id_penjualan}`)
        res.status(200).json({status: "Ok",message: "Data penjualan berhasil di update"})
    }catch(err){
        res.status(400).json(err.message)
    }
})

export default router;  