import express from "express";
import { client } from "../database.js";
import bcrypt from "bcryptjs"

const router = express.Router();

router.get("/getAdmin",async(req,res)=>{
    const result = await client.query("select id_admin, nama,email from admin order by id_admin asc")
    res.status(200).json({status: 'ok', message: "Data admin berhasil ditampilkan",data: result.rows})
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

router.delete("/deleteAdmin/:id_admin",async(req,res)=>{
    try{
        await client.query(`delete from admin where id_admin = '${req.params.id_admin}'`)
        res.status(200).json({status: "ok",message: "Data admin berhasil dihapus"})
    }catch(err){
        res.status(400).json(err.message)
    }
})

router.put("/updateAdmin/:id_admin",async(req,res)=>{
    try{
        await client.query(`update admin set nama = '${req.body.nama}', email='${req.body.email}'
        where id_admin = ${req.params.id_admin}`)
        res.status(200).json({status: "Ok",message: "Data admin berhasil di update"}) 
    }catch(err){
        res.status(400).json(err.message)
    }
})

export default router;