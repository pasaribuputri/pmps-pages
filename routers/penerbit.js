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

export default router;