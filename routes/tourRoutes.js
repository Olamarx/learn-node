import express from "express";
import {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkBody,
} from "../controllers/tourController.js";

const router = express.Router();

// router.param("id", checkID);

router.route("/").get(getTours).post(checkBody, createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;
