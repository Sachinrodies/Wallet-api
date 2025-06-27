import express from "express";
const router=express.Router();
import { sql } from "../config/db.js";
import { CreateTransaction, DeleteTransaction, getSummary, getTransactionsByUserId } from "../controllers/TransactionController.js";
router.get("/:user_id",getTransactionsByUserId)
router.post("/",CreateTransaction)
router.delete("/:id",DeleteTransaction)
router.get("/summary/:user_id",getSummary)

export default router;
