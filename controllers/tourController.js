import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

// created the __dirname since it is not in type module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../assets/tours-simple.json`)
);

const getTours = (req, res) => {
  console.log(req.requestTime);

  //   Jsend formats to send data, but the 'results' key is not there
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  //   Jsend formats to send data, but the 'results' key is not there
  const id = parseInt(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).send({ status: "failed", message: "Invalid ID" });
  }
  res.status(200).json({ status: "success", data: { tour } });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/assets/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: "success", data: newTour });
    }
  );
};

const updateTour = (req, res) => {
  const id = parseInt(req.params.id);
  if (id > tours.length) {
    return res.status(404).send({ status: "failed", message: "Invalid ID" });
  }
  res.status(200).json({
    status: "success",
    message: "Tour updated successfully",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);
  if (id > tours.length) {
    return res.status(404).send({ status: "failed", message: "Invalid ID" });
  }
  res.status(204).json({
    status: "success",
    message: "Tour deleted successfully",
    data: null,
  });
};

export { getTours, getTour, createTour, updateTour, deleteTour };