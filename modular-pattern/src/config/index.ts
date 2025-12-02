import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.join(process.cwd(), '.env')})
const config={
    CONNECTING_STRING:process.env.CONNECTING_STRING,
    PORT:process.env.port
}

export default config