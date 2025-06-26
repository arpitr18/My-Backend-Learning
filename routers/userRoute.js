import express, { Router } from "express";
import {
  userCreate,
  userDelet,
  userRead,
  userUpdate,
} from "../controllers/userController.js";

const router = Router();

//CRUD

//1. Create and 2. Read
router.route("/users").post(userCreate).get(userRead);
//3. Update
router.route("/updateUser/:id").put(userUpdate);
//4. Delete
router.route("/deleteUser/:id").delete(userDelet);

export default router;
