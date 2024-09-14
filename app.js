import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import morgan from "morgan";
import fs from "fs";

const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/", (req, res) => {
//     // By using .json, it would set the content type to "application/json
//   res.status(200).json({ message: "Hello from server", app: "Olamarx App" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/assets/tours-simple.json`)
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

// To get all tour information
// app.get("/api/v1/tours", getTours);

// To get one tour information
// app.get("/api/v1/tours/:id", getTour);

// To post a new tour
// app.post("/api/v1/tours", createTour);

// Update a part of the tour, reason i used patch
// app.patch("/api/v1/tours/:id", updateTour);

// Delete tour from the list of tours
// app.delete("/api/v1/tours/:id", deleteTour);

// Refactored
app.route("/api/v1/tours").get(getTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
