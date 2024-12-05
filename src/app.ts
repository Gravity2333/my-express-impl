import myExpress from "./lib/my-express";
import path from "path";
import fs from "fs";
import userRouter from "./routers/user";
import loginRouter from "./routers/login";
import asyncMiddlewares from "./routers/async";

const app = myExpress();

app.use("*",myExpress.static(path.resolve(__dirname,'../public')))

app.use("*", myExpress.urlencoded());

app.use("/user", userRouter);

app.use("/login", loginRouter);

app.use('/async', asyncMiddlewares)

/** 设置404 Page */
app.use("*", async (req, res) => {
  if (!res.writableFinished) {
    res.setHeader("content-type", "text/html");
    /** 移步读取html文件 */
    const defaultPage = await fs.promises.readFile(
      path.resolve(__dirname, "../public/NotFound.html"),
      { encoding: "utf-8", flag: "r" }
    );
    res.statusCode = 404;
    res.end(defaultPage);
  }
});

app.listen(8088, () => {
  console.log("Server listening on port http://0.0.0.0:8088");
});
