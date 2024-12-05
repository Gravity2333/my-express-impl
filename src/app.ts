import myExpress from "./lib/my-express";
import path from "path";
import fs from "fs";
import userRouter from "./routers/user";
import loginRouter from "./routers/login";
import asyncMiddlewares from "./routers/async";

const app = myExpress();
/** 注册静态资源托管 */
app.use("*", myExpress.static(path.resolve(__dirname, "../public")));
/** 注册请求body urlEncoded解析 */
app.use("*", myExpress.urlencoded());
/** 注册user路由 */
app.use("/user", userRouter);
/** 注册登录路由 */
app.use("/login", loginRouter);
/** 注册异步路由 */
app.use("/async", asyncMiddlewares);

/** 设置404 Page */
app.use(
  "*",
  myExpress.notFoundPage(path.resolve(__dirname, "../public/NotFound.html"))
);

app.listen(8088, () => {
  console.log("Server listening on port http://127.0.0.1:8088");
});
