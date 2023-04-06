import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import auth from './routers/auth.js'
import bukuRouter from "./routers/buku.js"
import adminRouter from "./routers/admin.js"
import genreRouter from "./routers/genre.js"
import kategoriRouter from "./routers/kategori.js"
import penerbitRouter from "./routers/penerbit.js"
import penjualamRouter from "./routers/penjualan.js"


const app = express();
const port = process.env.PORT
app.use(express.json())

// MIDDLEWARE
app.use(cookieParser())
app.use((req, res, next) => {
    if(req.path.startsWith('/api/auth') || req.path.startsWith('/assets') || req.path.startsWith('/photos')){
        next()
    } else {
        let authorized = false;
        if(req.cookies.token){
            try{
                jwt.verify(req.cookies.token, process.env.SECRET_KEY);
                authorized = true;
            } catch(err) {
                res.setHeader("Cache-Control",'no-store');
                res.clearCookie('token');
            }
        }
        if(authorized){
            if(req.path.startsWith('/login')){
                res.redirect('/pmps-pages/dashboard')
            }else {
                next()
            }
        } else {
            if (req.path.startsWith("/login")) {
                next();
            } else {
                if (req.path.startsWith("/api")) {
                  res.status(401);
                  res.send("Anda harus login terlebih dahulu.");
                } else {
                  res.redirect("/login");
                }
            }
        }
    }
})

// app.use(express.static("public"));
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));



app.use('/api/auth', auth);
app.use("/api/buku",bukuRouter);
app.use("/api/admin",adminRouter);
app.use("/api/genre",genreRouter);
app.use("/api/kategori",kategoriRouter)
app.use("/api/penerbit",penerbitRouter)
app.use("/api/penjualan",penjualamRouter)


app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(port, () => console.log(`Berjalan pada port ${port}`));