import { MiddlewareHandler } from "../typings";
import url from "url";
import qs from "querystring";

/** 解析请求query */
export default () => {
  const parseQueryHandler: MiddlewareHandler = (req, res, next) => {
    const { query } = url.parse(req.url!);
    req.query = qs.parse(query || "");
    next()
  };
  return parseQueryHandler;
};
