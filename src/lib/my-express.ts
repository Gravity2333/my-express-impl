import http from "http";
import url from "url";
import { pathToRegexp } from "path-to-regexp";
import urlencoded from "./middlewares/urlencoded";
import jsonResponse from "./middlewares/jsonResponse";
import parseQuery from "./middlewares/parseQuery";
import parseParams from "./middlewares/parseParams";
import {
  Method,
  Middleware,
  MiddlewareHandler,
  MyExpressApp,
  MyExpressRouter,
  Request,
  Response,
} from "./typings";

/**
 * 生成中间件对象
 * @param method 请求方法
 * @param path 路径
 * @returns
 */
function _generateMiddleware(
  method: Method,
  path: string,
  handler: MiddlewareHandler
): Middleware {
  const pathReg =
    path === "*"
      ? {
          regexp: /^\/.*$/,
        }
      : pathToRegexp(path, { end: false });

  return {
    method,
    pathRegexp: pathReg.regexp,
    handler,
  };
}

/** 返回一个工厂方法 */
export default function myExpress(): MyExpressApp {
  /** middlewares */
  const middlewares: Middleware[] = [
    /** 添加集成中间件 */
    _generateMiddleware(Method.ALL, "*", jsonResponse()),
    _generateMiddleware(Method.ALL, "*", parseQuery()),
    // _generateMiddleware(Method.ALL, "*", parseParams()),
  ];

  /**
   * 返回的app函数
   * @param request
   * @param response
   */
  function _app(request: Request, response: Response) {
    /**
     * next函数
     * @param path 查找路径
     * @param err 错误信息（可选）
     */
    function _next(iterator: Iterator<Middleware, void, unknown>, err?: any) {
      const nextMiddleware = iterator.next()?.value;
      if (nextMiddleware) {
        nextMiddleware.handler(
          request as Request,
          response as Response,
          _next.bind(null, iterator),
          nextMiddleware
        );
      }
    }

    function* _middwareGenerator(method: string, path: string) {
      for (const middleware of middlewares) {
        /** method过滤 */
        if (middleware.method === method || middleware.method === Method.ALL) {
          // console.log(middleware.pathRegexp,path,middleware.pathRegexp.test(path))
          if (middleware.pathRegexp.test(path)) {
            yield middleware;
          }
        }
      }
    }

    const { pathname } = url.parse(request.routerUrl || request.url!);
    const method = request.method?.toUpperCase() || Method.GET;
    const middlewareIterator = _middwareGenerator(method, pathname!);
    _next(middlewareIterator);
  }

  /** 创建httpServer */
  const httpServer = http.createServer(_app as any);

  /**
   * 监听端口
   * @param port 端口
   * @param callback 回调函数（可选）
   */
  _app.listen = function (port: number, callback?: () => void) {
    httpServer.listen(port, callback);
  };

  /** use函数 注册插件
   * @param {path} 匹配路径
   * @param {middlewareHandler} 插件处理函数
   * @returns void
   */
  _app.use = function (
    path: string = "*",
    middlewareHandler: MiddlewareHandler
  ) {
    middlewares.push(_generateMiddleware(Method.ALL, path, middlewareHandler));
  };

  /** 注册Get插件
   * @param {path} 匹配路径
   * @param {middlewareHandler} 插件处理函数
   * @returns void
   */
  _app.get = function (
    path: string = "*",
    middlewareHandler: MiddlewareHandler
  ) {
    middlewares.push(_generateMiddleware(Method.GET, path, middlewareHandler));
  };

  /** 注册Post插件
   * @param {path} 匹配路径
   * @param {middlewareHandler} 插件处理函数
   * @returns void
   */
  _app.post = function (
    path: string = "*",
    middlewareHandler: MiddlewareHandler
  ) {
    middlewares.push(_generateMiddleware(Method.POST, path, middlewareHandler));
  };

  /** 注册Put插件
   * @param {path} 匹配路径
   * @param {middlewareHandler} 插件处理函数
   * @returns void
   */
  _app.put = function (
    path: string = "*",
    middlewareHandler: MiddlewareHandler
  ) {
    middlewares.push(_generateMiddleware(Method.PUT, path, middlewareHandler));
  };

  /** 注册Delete插件
   * @param {path} 匹配路径
   * @param {middlewareHandler} 插件处理函数
   * @returns void
   */
  _app.delete = function (
    path: string = "*",
    middlewareHandler: MiddlewareHandler
  ) {
    middlewares.push(
      _generateMiddleware(Method.DELETE, path, middlewareHandler)
    );
  };

  return _app;
}

myExpress.Router = () => {
  const router = myExpress();
  const routerHandler: MiddlewareHandler = (
    req,
    res,
    next,
    currentMiddleware
  ) => {
    req.routerUrl = req.url?.replace(currentMiddleware?.pathRegexp!, "");
    if(!req.routerUrl?.startsWith('/')){
        req.routerUrl = '/'+req.routerUrl
    }
    router(req, res);
  };
  for (const key in router) {
    if (key !== "listen") {
      (routerHandler as any)[key] = (router as any)[key];
    }
  }
  Object.setPrototypeOf(routerHandler, router);
  return routerHandler as unknown as MyExpressRouter;
};

/** 导出middlewares */
myExpress.urlencoded = urlencoded;
