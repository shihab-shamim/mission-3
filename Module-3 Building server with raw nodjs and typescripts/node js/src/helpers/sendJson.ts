import { ServerResponse } from "http";

function sendJson(res:ServerResponse,statusCode:number,data:any){
    res.writeHead(statusCode, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(data)
      );

}
export default sendJson