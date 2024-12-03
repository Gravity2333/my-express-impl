"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const querystring_1 = __importDefault(require("querystring"));
/** 解析请求query */
exports.default = () => {
    const parseQueryHandler = (req, res, next) => {
        const { query } = url_1.default.parse(req.url);
        req.query = querystring_1.default.parse(query || "");
        next();
    };
    return parseQueryHandler;
};
