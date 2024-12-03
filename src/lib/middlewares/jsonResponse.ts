import { MiddlewareHandler } from "../typings";

/** 解析响应JSON */
export default () => {
  const jsonResponseHandler: MiddlewareHandler = (req, res, next) => {
    res.json = (jsonObj: Object) => {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(jsonObj));
    };
    next()
  };
  return jsonResponseHandler;
};
