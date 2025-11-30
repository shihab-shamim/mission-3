import http, { IncomingMessage, ServerResponse, Server } from "http";
import { config } from "./config";
import addRoutes, { RouteHandle, routes } from "./helpers/RouteHandler";
import sendJson from "./helpers/sendJson";
import parseBody from "./helpers/parsBody";
import { readUsers, writeUsers } from "./helpers/fileDb";
import finddynamicRoute from "./helpers/finddynamicRoute";
addRoutes("GET","/",(req,res)=>{
 sendJson(res,200,   {
          message: "Hello from Node.js with TypeScript ",
          url: req.url,
          
        })
})
addRoutes("GET","/api",(req,res)=>{
 sendJson(res,200,   {
           message: "heath status ok",
          url: req.url,
          
        })
})
addRoutes("POST","/api/users",async(req,res)=>{
  const body=await parseBody(req)
  const users=readUsers()
  const newUser={

    ...body
  }
  users.push(newUser)
   writeUsers(users)
  sendJson(res,201,{success:true,data:body})

})
addRoutes("PUT","/api/users:id",async(req,res)=>{
  const {id}=(req as any).params
  const body=await parseBody(req)

  const users=readUsers()
  const index=users.findIndex((user:any)=>user.id == id)
  if(index==-1){
    sendJson(res,404,{success:true,message:"user not found"})

  }
  users[index]={...users[index], ...body}
  writeUsers(users)
  sendJson(res,201,{success:true,message:`user updated ${users}`})

})


const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running...");
// root route
    // if (req.url === "/" && req.method === "GET") {
    //   res.writeHead(200, { "Content-Type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Hello from Node.js with TypeScript ",
    //       url: req.url,
          
    //     })
    //   );
    // } 
    const method=req.method?.toUpperCase() || ""
    const path=req.url || ""
    // const handler=methodMap?.get(path)


    const methodMap=routes.get(method);
    const handler:RouteHandle| undefined=methodMap?.get(path)
    if(handler){
      handler(req,res)

    } 
    else if(finddynamicRoute(method,path)){
      const match=finddynamicRoute(method,path);
      (req as any).params= match?.params;
      match?.handler(req,res);

    }
    else{
       res.writeHead(404, { "Content-Type": "application/json" });
         res.end(
        JSON.stringify({
          message: "route not found ",
          success: false,
          path
        })
      );

    }

    // health route
    // if(req.url === "/api" && req.method === "GET"){
    //      res.writeHead(200, { "Content-Type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "heath status ok",
    //       url: req.url,
          
    //     })
    //   );

    // }
    
    // if(req.url === "/api/users" && req.method === "POST"){
    // //     const user ={
    // //         id:1,
    // //         name:"shihab"
    // //     }
    // //      res.writeHead(200, { "Content-Type": "application/json" });
    // //   res.end(
    // //     JSON.stringify(user)
    // //   );
    // let body ='';
    // // listen for data chunk 
    // req.on("data",(chunk)=>{
    //     body+=chunk.toString()
    // })
    // req.on("end",()=>{
    //     try {
    //         const parseBody=JSON.parse(body)
    //     console.log(parseBody);
    //      res.end(JSON.stringify(parseBody))
            
    //     } catch (error:any) {
    //         console.log(error?.message);
            
    //     }

    // })

    // // res.end(body)

    // }


  }
);

server.listen(config.port, () => {
  console.log("Server is running at ",config.port);
});
