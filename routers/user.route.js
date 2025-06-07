import { Router } from "express";

const userRouter = Router();

// Define routes for user operations
userRouter.get("/create-user", (req, res) => {
  res.send("Create a new user");
});

userRouter.get("/post-user", (req, res) => {
  res.send("Post a new user");
});

userRouter.get("/delete-user", (req, res) => {
  res.send("Delete a user");
});

userRouter.get("/update-user", (req, res) => {
  res.send("Update a user");
});

export default userRouter;