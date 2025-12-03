import { Request, Response } from "express"
import { pool } from "../../config/db"
import { userServices } from "./user.service"

const createUser=async(req:Request, res:Response) => {
  const {name,email} =req?.body
 try { 
    const result =await userServices.createUser(name,email)
   
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
 
}

const getUser= async (req: Request, res: Response) => {
  try {
    const result =await userServices.getUser()

    
        res.send({
            data:result.rows,
             success:true,
             message:"data get successfully",
        })
    
  } catch (error) {
    
  }
}

const getSingleUser=async (req: Request, res: Response) => {
    const id = Number(req.params?.id)
   
   
  try {
    const result =await userServices.getSingleUser(id)

    // const result=await pool.query(`
    //     SELECT * FROM users WHERE id =$1
    //     `,[id])
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
}
const updatedUser=async (req: Request, res: Response) => {
      const id = Number(req.params?.id);
    const {name,email}=req.body
   
   
  try {
    const result =await userServices.updatedUser(name,email,id)

    // const result=await pool.query(`
    //     SELECT * FROM users WHERE id =$1
    //     `,[id])
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
}

const deleteUser =async (req: Request, res: Response) => {
    const id = Number(req.params?.id);
  
    
   
   
  try {
    const result=await userServices.deleteUser(id)
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
} 


export const userController={
    createUser,
    getUser,
    getSingleUser,
    updatedUser,
    deleteUser
}