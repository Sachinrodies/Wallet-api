import express from "express";
import dotenv from "dotenv";

import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";
import { initDB } from "./config/db.js";
dotenv.config();
const app = express();

if(process.env.NODE_ENV==="production"){
    job.start();

}
const PORT = process.env.PORT||5001;
app.use(express.json());
app.use(rateLimiter)

app.get("/",(req,res)=>{
    res.send("It is working");
})
app.use("/api/transactions",transactionsRoute)
// app.use("/api/products",productsRoute)
app.get("/api/health",(req,res)=>{
    res.status(200).json({
        status:"ok"
    })
})


console.log("My Port:"+process.env.PORT)
initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running on port:"+PORT);
    })
})


