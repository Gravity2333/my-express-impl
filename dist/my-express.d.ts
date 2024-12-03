import { MiddlewareHandler, MyExpressApp, MyExpressRouter } from "./typings";
/** 返回一个工厂方法 */
declare function myExpress(): MyExpressApp;
declare namespace myExpress {
    var Router: () => MyExpressRouter;
    var urlencoded: () => MiddlewareHandler;
}
export default myExpress;
