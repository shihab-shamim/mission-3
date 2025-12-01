import express, {NextFunction, Request,Response} from "express"
import {Pool} from 'pg'
import dotenv from 'dotenv'
import path from 'path'
const app = express()
const port = 5000
dotenv.config({path:path.join(process.cwd(), '.env')})

app.use(express.json())
// from data theke data nite use hoi 
// app.use(express.urlencoded())

// DB 
const pool =new Pool({
    connectionString:`${process.env.CONNECTING_STRING}`
})
const initDB = async () => {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users_todos (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        complete BOOLEAN DEFAULT FALSE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

  
};

initDB();

// logger middleware 
const logger =(req:Request,res:Response,next:NextFunction)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`);

    next()

}


app.get('/', logger,(req:Request, res:Response) => {
  res.send('next label developer')
})

// users releted 
app.post("/users", async(req:Request, res:Response) => {
  const {name,email} =req?.body
 try { 
    const result =await pool.query(`INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`,[name,email])
    // console.log(result.rows[0]);
    res.status(200).send({
    success:true,
    message:"data inserted successfully",
    data:result.rows[0]

  })
    
 } catch (error:any) {
    res.status(500).send({
    success:false,
    message:error?.message

  })
    
 }
 
})
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result=await pool.query(`
        SELECT * FROM users
        `)
        res.send({
            data:result.rows,
             success:true,
             message:"data get successfully",
        })
    
  } catch (error) {
    
  }
});
app.get("/users/:id", async (req: Request, res: Response) => {
    const id = Number(req.params?.id)
   
   
  try {
    const result=await pool.query(`
        SELECT * FROM users WHERE id =$1
        `,[id])
        if(result.rows.length ===0){
            res.status(404).send({
            data:result.rows[0],
             success:true,
             message:"data get not found",
        })

        }
        else{
            res.send({
            data:result.rows[0],
             success:true,
             message:"data get successfully",
        })
        }
    
  } catch (error:any) {

    res.send({
            // data:result.rows[0],
             success:false,
             message:"data get filed",
        })
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
    const id = Number(req.params?.id);
    const {name,email}=req.body
    
   
   
  try {
    const result=await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,[name,email,id])
        if(result.rows.length ===0){
            res.status(404).send({
            data:result.rows[0],
             success:true,
             message:"data get not found",
        })

        }
        else{
            res.send({
            data:result.rows[0],
             success:true,
             message:"data get successfully",
        })
        }
    
  } catch (error:any) {

    res.send({
            // data:result.rows[0],
             success:false,
             message:"data get filed",
        })
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
    const id = Number(req.params?.id);
  
    
   
   
  try {
    const result=await pool.query(`DELETE FROM users WHERE id=$1 `,[id])
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
    
   catch (error:any) {

    res.send({
            // data:result.rows[0],
             success:false,
             message:"data get filed",
        })
  }
});


//  
app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"not fount",
        path:req.path
    })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
