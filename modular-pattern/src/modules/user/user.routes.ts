import express, { Request, Response } from "express"
import { pool } from "../../config/db"
import { userController } from "./user.controller"


const router=express.Router()

// http://localhost:5000/users=>root
// routes -> controller=>service;

router.post("/",userController.createUser)

router.get("/",userController.getUser)
router.get("/:id",userController.getSingleUser)
router.put("/:id",userController.updatedUser)

export const userRoute=router;