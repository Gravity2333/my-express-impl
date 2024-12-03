import myExpress from "./lib/my-express";
import path from "path";
import fs from "fs";
import userRouter from "./routers/user";
import loginRouter from "./routers/login";

const app = myExpress();

const defaultPage = fs.readFileSync(
  path.resolve(__dirname, "../template.html"),
  { encoding: "utf-8", flag: "r" }
);

app.use("*", myExpress.urlencoded());

app.use("/user", userRouter);

app.use("/login", loginRouter);

app.use("*", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.end(defaultPage);
});

app.listen(8088, () => {
  console.log("Server listening on port http://0.0.0.0:8088");
});
