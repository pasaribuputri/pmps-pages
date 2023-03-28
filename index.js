import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bukuRouter from "./routers/buku.js"
import adminRouter from "./routers/admin.js"
import genreRouter from "./routers/genre.js"
import kategoriRouter from "./routers/kategori.js"
import penerbitRouter from "./routers/penerbit.js"
import penjualamRouter from "./routers/penjualan.js"

const app = express();
const port = process.env.PORT

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.json())
app.use("/api/buku",bukuRouter);
app.use("/api/admin",adminRouter);
app.use("/api/genre",genreRouter);
app.use("/api/kategori",kategoriRouter)
app.use("/api/penerbit",penerbitRouter)
app.use("/api/penjualan",penjualamRouter)

app.listen(port, () => console.log(`Berjalan pada port ${port}`));