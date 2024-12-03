import myExpress from "../lib/my-express";

const loginRouter = myExpress.Router();

loginRouter.post("/", (req, res) => {
    res.statusCode = 200;
    res.end("ok");
  });
  

export default loginRouter;
