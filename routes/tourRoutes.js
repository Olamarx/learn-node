import express from "express";
import {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours
} from "../controllers/tourController.js";

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getTours)
// router.param("id", checkID);

router.route("/").get(getTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;
