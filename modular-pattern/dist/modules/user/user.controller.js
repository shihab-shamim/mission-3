"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    const { name, email } = req?.body;
    try {
        const result = await user_service_1.userServices.createUser(name, email);
        // console.log(result.rows[0]);
        res.status(200).send({
            success: true,
            message: "data inserted successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error?.message
        });
    }
};
const getUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getUser();
        res.send({
            data: result.rows,
            success: true,
            message: "data get successfully",
        });
    }
    catch (error) {
    }
};
const getSingleUser = async (req, res) => {
    const id = Number(req.params?.id);
    try {
        const result = await user_service_1.userServices.getSingleUser(id);
        // const result=await pool.query(`
        //     SELECT * FROM users WHERE id =$1
        //     `,[id])
        if (result.rows.length === 0) {
            res.status(404).send({
                data: result.rows[0],
                success: true,
                message: "data get not found",
            });
        }
        else {
            res.send({
                data: result.rows[0],
                success: true,
                message: "data get successfully",
            });
        }
    }
    catch (error) {
        res.send({
            // data:result.rows[0],
            success: false,
            message: "data get filed",
        });
    }
};
const updatedUser = async (req, res) => {
    const id = Number(req.params?.id);
    const { name, email } = req.body;
    try {
        const result = await user_service_1.userServices.updatedUser(name, email, id);
        // const result=await pool.query(`
        //     SELECT * FROM users WHERE id =$1
        //     `,[id])
        if (result.rows.length === 0) {
            res.status(404).send({
                data: result.rows[0],
                success: true,
                message: "data get not found",
            });
        }
        else {
            res.send({
                data: result.rows[0],
                success: true,
                message: "data get successfully",
            });
        }
    }
    catch (error) {
        res.send({
            // data:result.rows[0],
            success: false,
            message: "data get filed",
        });
    }
};
const deleteUser = async (req, res) => {
    const id = Number(req.params?.id);
    try {
        const result = await user_service_1.userServices.deleteUser(id);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (error) {
        res.send({
            // data:result.rows[0],
            success: false,
            message: "data get filed",
        });
    }
};
exports.userController = {
    createUser,
    getUser,
    getSingleUser,
    updatedUser,
    deleteUser
};
