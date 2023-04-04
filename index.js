import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { client } from "./database.js";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs"

import bukuRouter from "./routers/buku.js"
import adminRouter from "./routers/admin.js"
import genreRouter from "./routers/genre.js"
import kategoriRouter from "./routers/kategori.js"
import penerbitRouter from "./routers/penerbit.js"
import penjualamRouter from "./routers/penjualan.js"

const app = express();
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT

// app.use((req, res, next) => {
//     if (req.path.startsWith("/api/login") || req.path.startsWith("/assets") ) {
//         next();
//     } else {
//         let authorized = false;
//         if (req.cookies.token) {
//             try{
//                 jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY)
//                 authorized = true;
//             }catch(err){
//                 res.setHeader("Cache-Control","no-store"); // khusus vercel
//                 res.clearCookie("token")
//             }   
//         }if(authorized){
//             if(req.path.startsWith("/")){
//                 res.redirect("/pmps-pages/dashboard")
//             }else{
//                 next()
//             }
//         }else{
//             if(req.path.startsWith("/")){
//                 next()
//             }else{
//                 if(req.path.startsWith("/api")){
//                     res.status(401)
//                     res.send("Anda harus login terlebih dahulu")
//                 }else{
//                     res.redirect("/")
//                 }
//             }
//         }
//     }
// });

// MIDDLEWARE
app.use(express.static("public"));


// app.post("/api/login", async (req, res) => {
//   const results = await client.query(
//     `SELECT * FROM admin WHERE email = '${req.body.email}'`
//   );
//   console.log(results.rows)
//   if (results.rows.length > 0) {
//     if (await bcrypt.compare(req.body.kode_akses, results.rows[0].kode_akses)) {
//       const token = jwt.sign(results.rows[0], process.env.JWT_SECRET_KEY);
//       res.cookie("token", token);
//       res.send("Login berhasil.");
//     } else {
//       res.status(401);
//       res.send("Kata sandi salah.");
//     }
//   } else {
//     res.status(401);
//     res.send("Admin tidak ditemukan.");
//   }
// });

app.use("/api/buku",bukuRouter);
app.use("/api/admin",adminRouter);
app.use("/api/genre",genreRouter);
app.use("/api/kategori",kategoriRouter)
app.use("/api/penerbit",penerbitRouter)
app.use("/api/penjualan",penjualamRouter)

app.listen(port, () => console.log(`Berjalan pada port ${port}`));