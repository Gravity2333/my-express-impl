"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 解析响应JSON */
exports.default = () => {
    const jsonResponseHandler = (req, res, next) => {
        res.json = (jsonObj) => {
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify(jsonObj));
        };
        next();
    };
    return jsonResponseHandler;
};
