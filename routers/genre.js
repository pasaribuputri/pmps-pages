import express from "express";
import { client } from "../database.js";

const router = express.Router();

router.get("/getGenre",async(req,res)=>{
    const result = await client.query("select * from genre")
    res.send(result.rows)
})

export default router;