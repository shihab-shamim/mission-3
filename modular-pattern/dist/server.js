"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const db_1 = __importStar(require("./config/db"));
const logger_1 = __importDefault(require("./midleware/logger"));
const user_routes_1 = require("./modules/user/user.routes");
const app = (0, express_1.default)();
const port = config_1.default.PORT;
app.use(express_1.default.json());
// from data theke data nite use hoi 
// app.use(express.urlencoded())
// initializing db 
(0, db_1.default)();
// logger middleware 
//  "/"=>localhost bujhai
app.get('/', logger_1.default, (req, res) => {
    res.send('next label developer modular pattern');
});
app.use("/users", user_routes_1.userRoute);
// todos 
app.post("/todos", async (req, res) => {
    const { user_id, title } = req.body;
    try {
        const result = await db_1.pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);
        res.status(201).json({
            success: true,
            message: "Todo created",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
app.get("/todos", async (req, res) => {
    try {
        const result = await db_1.pool.query(`SELECT * FROM todos`);
        res.status(200).json({
            success: true,
            message: "todos retrieved successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err,
        });
    }
});
// Get single todo
app.get("/todos/:id", async (req, res) => {
    try {
        const result = await db_1.pool.query("SELECT * FROM todos WHERE id = $1", [
            req.params.id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch todo" });
    }
});
// Update todo
app.put("/todos/:id", async (req, res) => {
    const { title, completed } = req.body;
    try {
        const result = await db_1.pool.query("UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *", [title, completed, req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update todo" });
    }
});
// Delete todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const result = await db_1.pool.query("DELETE FROM todos WHERE id=$1 RETURNING *", [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json({ success: true, message: "Todo deleted", data: null });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
});
//  
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "not fount",
        path: req.path
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
