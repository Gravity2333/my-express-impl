"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const mime_1 = __importDefault(require("mime"));
/** 解析请求params */
exports.default = (staticPath) => {
    const staticHandler = (req, res, next, currentMiddleware) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { pathname } = url_1.default.parse(req.url);
            if (!pathname || pathname === '/') {
                pathname = '/index.html';
            }
            const filePath = path_1.default.join(staticPath, pathname);
            const fileContent = yield fs_1.default.promises.readFile(filePath, { encoding: 'utf-8', flag: 'r' });
            const ext = path_1.default.extname(filePath);
            res.setHeader('content-type', mime_1.default.getType(ext) || 'text/plain');
            res.end(fileContent);
        }
        catch (e) {
            next();
        }
    });
    return staticHandler;
};
