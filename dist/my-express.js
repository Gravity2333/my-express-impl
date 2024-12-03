"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = myExpress;
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const path_to_regexp_1 = require("path-to-regexp");
const urlencoded_1 = __importDefault(require("./middlewares/urlencoded"));
const jsonResponse_1 = __importDefault(require("./middlewares/jsonResponse"));
const parseQuery_1 = __importDefault(require("./middlewares/parseQuery"));
const typings_1 = require("./typings");
/**
 * 生成中间件对象
 * @param method 请求方法
 * @param path 路径
 * @returns
 */
function _generateMiddleware(method, path, handler) {
    const pathReg = path === "*"
        ? {
            regexp: /^\/.*$/,
        }
        : (0, path_to_regexp_1.pathToRegexp)(path, { end: false });
    return {
        method,
        pathRegexp: pathReg.regexp,
        handler,
    };
}
/** 返回一个工厂方法 */
function myExpress() {
    /** middlewares */
    const middlewares = [
        /** 添加集成中间件 */
        _generateMiddleware(typings_1.Method.ALL, "*", (0, jsonResponse_1.default)()),
        _generateMiddleware(typings_1.Method.ALL, "*", (0, parseQuery_1.default)()),
        // _generateMiddleware(Method.ALL, "*", parseParams()),
    ];
    /**
     * 返回的app函数
     * @param request
     * @param response
     */
    function _app(request, response) {
        var _a;
        /**
         * next函数
         * @param path 查找路径
         * @param err 错误信息（可选）
         */
        function _next(iterator, err) {
            var _a;
            const nextMiddleware = (_a = iterator.next()) === null || _a === void 0 ? void 0 : _a.value;
            if (nextMiddleware) {
                nextMiddleware.handler(request, response, _next.bind(null, iterator), nextMiddleware);
            }
        }
        function* _middwareGenerator(method, path) {
            for (const middleware of middlewares) {
                /** method过滤 */
                if (middleware.method === method || middleware.method === typings_1.Method.ALL) {
                    // console.log(middleware.pathRegexp,path,middleware.pathRegexp.test(path))
                    if (middleware.pathRegexp.test(path)) {
                        yield middleware;
                    }
                }
            }
        }
        const { pathname } = url_1.default.parse(request.routerUrl || request.url);
        const method = ((_a = request.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || typings_1.Method.GET;
        const middlewareIterator = _middwareGenerator(method, pathname);
        _next(middlewareIterator);
    }
    /** 创建httpServer */
    const httpServer = http_1.default.createServer(_app);
    /**
     * 监听端口
     * @param port 端口
     * @param callback 回调函数（可选）
     */
    _app.listen = function (port, callback) {
        httpServer.listen(port, callback);
    };
    /** use函数 注册插件
     * @param {path} 匹配路径
     * @param {middlewareHandler} 插件处理函数
     * @returns void
     */
    _app.use = function (path = "*", middlewareHandler) {
        middlewares.push(_generateMiddleware(typings_1.Method.ALL, path, middlewareHandler));
    };
    /** 注册Get插件
     * @param {path} 匹配路径
     * @param {middlewareHandler} 插件处理函数
     * @returns void
     */
    _app.get = function (path = "*", middlewareHandler) {
        middlewares.push(_generateMiddleware(typings_1.Method.GET, path, middlewareHandler));
    };
    /** 注册Post插件
     * @param {path} 匹配路径
     * @param {middlewareHandler} 插件处理函数
     * @returns void
     */
    _app.post = function (path = "*", middlewareHandler) {
        middlewares.push(_generateMiddleware(typings_1.Method.POST, path, middlewareHandler));
    };
    /** 注册Put插件
     * @param {path} 匹配路径
     * @param {middlewareHandler} 插件处理函数
     * @returns void
     */
    _app.put = function (path = "*", middlewareHandler) {
        middlewares.push(_generateMiddleware(typings_1.Method.PUT, path, middlewareHandler));
    };
    /** 注册Delete插件
     * @param {path} 匹配路径
     * @param {middlewareHandler} 插件处理函数
     * @returns void
     */
    _app.delete = function (path = "*", middlewareHandler) {
        middlewares.push(_generateMiddleware(typings_1.Method.DELETE, path, middlewareHandler));
    };
    return _app;
}
myExpress.Router = () => {
    const router = myExpress();
    const routerHandler = (req, res, next, currentMiddleware) => {
        var _a, _b;
        req.routerUrl = (_a = req.url) === null || _a === void 0 ? void 0 : _a.replace(currentMiddleware === null || currentMiddleware === void 0 ? void 0 : currentMiddleware.pathRegexp, "");
        if (!((_b = req.routerUrl) === null || _b === void 0 ? void 0 : _b.startsWith('/'))) {
            req.routerUrl = '/' + req.routerUrl;
        }
        router(req, res);
    };
    for (const key in router) {
        if (key !== "listen") {
            routerHandler[key] = router[key];
        }
    }
    Object.setPrototypeOf(routerHandler, router);
    return routerHandler;
};
/** 导出middlewares */
myExpress.urlencoded = urlencoded_1.default;
