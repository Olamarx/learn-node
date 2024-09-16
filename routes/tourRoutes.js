import express from "express";
import {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} from "../controllers/tourController.js";

const router = express.Router();

// router.param("id", checkID);

router.route("/").get(getTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;
