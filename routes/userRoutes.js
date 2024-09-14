import express from "express";

import {
  deleteUser,
  createUser,
  updateUser,
  getUser,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
