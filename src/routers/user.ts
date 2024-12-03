import myExpress from "../lib/my-express";

const userRouter = myExpress.Router();

userRouter.get("/:id/info/:test", (req, res) => {
  console.log(req.query);
  res.json([
    {
      name: "bill",
      age: 18,
      score: 100,
    },
    {
      name: "bill",
      age: 18,
      score: 100,
    },
    {
      name: "bill",
      age: 18,
      score: 100,
    },
    {
      name: "bill",
      age: 18,
      score: 100,
    },
  ]);
});

userRouter.get("/list", (req, res) => {
  res.json([
    {
      name: "bill",
      age: 18,
      score: 100,
    },
    {
      name: "bill",
      age: 18,
      score: 100,
    },
    {
      name: "bill",
      age: 18,
      score: 100,
    },
    {
      name: "bill",
      age: 18,
      score: 100,
    },
  ]);
});

export default userRouter;
