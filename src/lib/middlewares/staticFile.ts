import { MiddlewareHandler } from "../typings";
import fs from 'fs'
import path from "path";
import url from "url";
import mime from 'mime'

/** 解析请求params */
export default (staticPath: string) => {
  const staticHandler: MiddlewareHandler = async (req, res, next, currentMiddleware) => {
    try{
      let { pathname } = url.parse(req.url!);
      if(!pathname || pathname === '/'){
        pathname = '/index.html'
      }
      const filePath = path.join(staticPath, pathname!)
      const fileContent = await fs.promises.readFile(filePath, { encoding: 'utf-8', flag: 'r' })
      const ext = path.extname(filePath)
      res.setHeader('content-type', mime.getType(ext) || 'text/plain')
      res.end(fileContent)
    }catch(e){
      next()
    }

  };
  return staticHandler;
};
