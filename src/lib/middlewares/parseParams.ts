import { MiddlewareHandler } from "../typings";
import url from "url";

/** 解析请求params */
export default () => {
  const parseParamsHandler: MiddlewareHandler = (req, res, next,currentMiddleware) => {
    const { pathname } = url.parse(req.url!);
    // 获得路径正则
    const pathRegExp = currentMiddleware?.pathRegexp!
    // console.log(pathRegExp,pathname,pathname?.match(pathRegExp))
    next()
  };
  return parseParamsHandler;
};
