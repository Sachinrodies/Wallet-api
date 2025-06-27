import express from "express";
import dotenv from "dotenv";

import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import { initDB } from "./config/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT||5001;
app.use(express.json());
app.use(rateLimiter)

app.get("/",(req,res)=>{
    res.send("It is working");
})
app.use("/api/transactions",transactionsRoute)
// app.use("/api/products",productsRoute)


console.log("My Port:"+process.env.PORT)
initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running on port:"+PORT);
    })
})


