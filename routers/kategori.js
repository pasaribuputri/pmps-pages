import express from "express"
import {client} from "../database.js"

const router = express.Router()

router.get("/getKategori",async(req,res)=>{
    const result = await client.query("select * from kategori")
    res.send(result.rows)
})

export default router;