"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(require("querystring"));
/** 解析URLENCOEEDE请求体 */
exports.default = () => {
    const urlEncodedHandler = (req, res, next) => {
        if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
            let bodyBffer = Buffer.alloc(0);
            req.on("data", (data) => {
                bodyBffer = Buffer.concat([bodyBffer, data]);
            });
            req.on("close", () => {
                const bodyString = bodyBffer.toString("utf-8");
                req.body = querystring_1.default.parse(bodyString);
                next();
            });
        }
        else {
            next();
        }
    };
    return urlEncodedHandler;
};
