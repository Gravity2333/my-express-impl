import http, { METHODS } from "http";

/** 请求方法 */
export enum Method {
  "GET" = "GET",
  "POST" = "POST",
  "PUT" = "PUT",
  "DELETE" = "DELETE",
  "ALL" = "ALL",
}

export type NextFn = (err?: any) => Promise<void>

export interface Request extends http.IncomingMessage {
  query: Record<string, any>;
  body: any;
  routerUrl?: string;
}

export interface Response extends http.ServerResponse {
  json: (jsonObj: Object) => void;
}

export type MiddlewareHandler = (
  request: Request,
  response: Response,
  next: NextFn,
  currentMiddleware?: Middleware
) => void;

export type Middleware = {
  method: string;
  pathRegexp: RegExp;
  handler: MiddlewareHandler;
};


export interface MyExpressAppBase {
  listen(port: number, callback?: () => void): void;
  use(path: string | undefined, middlewareHandler: MiddlewareHandler): void;
  get(path: string | undefined, middlewareHandler: MiddlewareHandler): void;
  post(path: string | undefined, middlewareHandler: MiddlewareHandler): void;
  put(path: string | undefined, middlewareHandler: MiddlewareHandler): void;
  delete(path: string | undefined, middlewareHandler: MiddlewareHandler): void;
}

export interface MyExpressApp extends MyExpressAppBase {
  (request: Request, response: Response): void;
  _outerNext?: NextFn
}

export interface MyExpressRouter extends Omit<MyExpressAppBase, 'listen'> {
  (request: Request, response: Response, next: NextFn): void;
}
