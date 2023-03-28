import express from "express";
import { client } from "../database.js";

const router = express.Router();

router.get("/getPenerbit",async(req,res)=>{
    const result = await client.query("select * from penerbit")
    res.send(result.rows)
})

export default router;