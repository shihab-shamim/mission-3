"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// http://localhost:5000/users=>root
// routes -> controller=>service;
router.post("/", user_controller_1.userController.createUser);
router.get("/", user_controller_1.userController.getUser);
router.get("/:id", user_controller_1.userController.getSingleUser);
router.put("/:id", user_controller_1.userController.updatedUser);
router.put("/:id", user_controller_1.userController.updatedUser);
router.delete("/:id", user_controller_1.userController.deleteUser);
exports.userRoute = router;
