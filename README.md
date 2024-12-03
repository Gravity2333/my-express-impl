# my-express-impl

本项目实现了一个expressjs的基本功能，包含中间件（middleware）路由(router) 等。目的是了解expressjs运行原理。

## 下载依赖
```sh
npm install
```

### 运行
```sh
npm run start
```

### 打包lib
```sh
npm run build
```

### 基本使用
```javascript
// app.ts
import myExpress from "./lib/my-express";

const app = myExpress();

// 注册中间件,解析body
app.use("*", myExpress.urlencoded());

// 注册路由
app.use("/login", loginRouter);

app.listen(8088, () => {
  console.log("Server listening on port http://0.0.0.0:8088");
});


// router/user.ts
// 编写路由
import myExpress from "../lib/my-express";

const loginRouter = myExpress.Router();

// 注册POST监听
loginRouter.post("/", (req, res) => {
    res.statusCode = 200;
    res.end("ok");
  });
  

export default loginRouter;
```

