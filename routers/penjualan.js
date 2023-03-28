import express from "express";
import { client } from "../database.js";

const router = express.Router();

router.get("/getPenjualan",async(req,res)=>{
    const result = await client.query("select * from penjualan")
    res.send(result.rows)
})

export default router;