import express from "express";
import { client } from "../database.js";

const router = express.Router();

router.get("/getAdmin",async(req,res)=>{
    const result = await client.query("select * from admin")
    res.send(result.rows)
})

export default router;