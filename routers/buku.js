import express from "express";
import { client } from "../database.js";
import multer from "multer";

const router = express.Router();

router.get("/getBuku",async(req,res)=>{
    const result = await client.query("select * from buku")
    res.send(result.rows)
})


export default router;