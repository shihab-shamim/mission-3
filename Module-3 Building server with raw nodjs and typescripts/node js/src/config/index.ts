import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.join(process.cwd(), ".env")})
export const  config={
    env:process.env.NODE_NAME ?? "developmnt",
    port:process.env.PORT ?? 5000
}