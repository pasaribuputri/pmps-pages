import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const port = process.env.PORT

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.json())

app.listen(port, () => console.log(`Berjalan pada port ${port}`));