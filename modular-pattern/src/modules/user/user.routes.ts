import express from "express"
import { userController } from "./user.controller"


const router=express.Router()

// http://localhost:5000/users=>root
// routes -> controller=>service;

router.post("/",userController.createUser)

router.get("/",userController.getUser)
router.get("/:id",userController.getSingleUser)
router.put("/:id",userController.updatedUser)
router.put("/:id",userController.updatedUser)
router.delete("/:id",userController.deleteUser)

export const userRoute=router;