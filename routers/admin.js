import express from "express";
import { client } from "../database.js";
import bcrypt from "bcryptjs"

const router = express.Router();

router.get("/getAdmin",async(req,res)=>{
    const result = await client.query("select * from admin")
    res.send(result.rows)
})

router.post("/addAdmin",async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.kode_akses, salt)
        await client.query(`insert into admin (nama,kode_akses,email) values ('${req.body.nama}','${hash}','${req.body.email}')`)
        res.status(200).json({status: "created",message: "Data admin berhasil ditambahkan"})
    }catch(err){
        res.status(400).json(err.message)
    }
})

export default router;