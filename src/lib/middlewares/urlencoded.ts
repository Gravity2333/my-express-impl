import { MiddlewareHandler } from "../typings";
import qs from "querystring";

/** 解析URLENCOEEDE请求体 */
export default () => {
  const urlEncodedHandler: MiddlewareHandler = (req, res, next) => {
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
      let bodyBffer = Buffer.alloc(0);
      req.on("data", (data) => {
        bodyBffer = Buffer.concat([bodyBffer, data]);
      });

      req.on("close", () => {
        const bodyString = bodyBffer.toString("utf-8");
        req.body = qs.parse(bodyString);
        next();
      });
    } else {
      next();
    }
  };
  return urlEncodedHandler;
};
