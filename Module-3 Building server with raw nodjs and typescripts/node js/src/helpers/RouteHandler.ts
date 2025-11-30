import { Handler } from './../../node_modules/arg/index.d';
import { IncomingMessage, ServerResponse } from 'http';
export type  RouteHandle=(req:IncomingMessage,res:ServerResponse)=>void
export const routes:Map<string,Map<string,RouteHandle>>=new Map()

function addRoutes(method:string,path:string,handler:RouteHandle){
    if(!routes.has(method)) routes.set(method,new Map())
        routes.get(method)?.set(path,handler)
}
export default addRoutes