import express from "express";
import { client } from "../database.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const router = express.Router();


router.post('/login', async(req, res) => {
    const result = await client.query('select * from admin');
    const promises = result.rows.map(async(admin) => {
        if(await bcrypt.compare(req.body.code, admin.kode_akses)){
            return admin
        }
    })
    const users = await Promise.all(promises);
    const user = users.find((admin) => admin != undefined)
    if(user){
        const token = jwt.sign(user, process.env.SECRET_KEY);
        res.cookie('token', token);
        res.status(200).json({status: 'ok', message: 'Login Berhasil', data: {
            userLogin: user.nama,
        }})
    }else {
        res.status(400).json({status: 'bad request', message: 'Kode akses salah'})
    }
})


export default router;