"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
/** 解析请求params */
exports.default = () => {
    const parseParamsHandler = (req, res, next, currentMiddleware) => {
        const { pathname } = url_1.default.parse(req.url);
        // 获得路径正则
        const pathRegExp = currentMiddleware === null || currentMiddleware === void 0 ? void 0 : currentMiddleware.pathRegexp;
        // console.log(pathRegExp,pathname,pathname?.match(pathRegExp))
        next();
    };
    return parseParamsHandler;
};
