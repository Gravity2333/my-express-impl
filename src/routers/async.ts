import myExpress from "../lib/my-express";

const asyncMiddlewares = myExpress.Router();

/** 测试异步中间件 */
asyncMiddlewares.use("*", async (req, res, next) => {
  console.log("Middlewares1 before")
  await next()
  console.log("Middlewares1 end")
});

asyncMiddlewares.use("*", async (req, res, next) => {
  console.log("Middlewares2 before")
  await next()
  console.log("Middlewares2 end")
});

asyncMiddlewares.use("*", async (req, res, next) => {
  console.log("Middlewares3 before")
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, 100);
  })
  await next()
  console.log("Middlewares3 end")
});

asyncMiddlewares.use("*", async (req, res, next) => {
  console.log("target before")
  res.end('async result')
  await next()
  console.log("target end")
});


export default asyncMiddlewares;
