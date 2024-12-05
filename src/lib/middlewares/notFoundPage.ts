import { MiddlewareHandler } from "../typings";
import fs from "fs";

/** 设置默认页面 */
export default (notFoundPath: string) => {
  const notFoundPageHandler: MiddlewareHandler = async (req, res, next) => {
    if (!res.writableFinished) {
      res.setHeader("content-type", "text/html");
      /** 移步读取html文件 */
      const defaultPage = await fs.promises.readFile(notFoundPath, {
        encoding: "utf-8",
        flag: "r",
      });
      res.statusCode = 404;
      res.end(defaultPage);
    }
  };
  return notFoundPageHandler;
};
