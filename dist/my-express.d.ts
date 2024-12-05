import { MiddlewareHandler, MyExpressApp, MyExpressRouter } from "./typings";
/** 返回一个工厂方法 */
declare function myExpress(): MyExpressApp;
declare namespace myExpress {
    export var Router: () => MyExpressRouter;
    export var urlencoded: () => MiddlewareHandler;
    var _a: (staticPath: string) => MiddlewareHandler;
    export { _a as static };
}
export default myExpress;
