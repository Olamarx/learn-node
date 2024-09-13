import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import fs from "fs";

const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

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
app.get("/api/v1/tours", (req, res) => {
  //   Jsend formats to send data, but the 'results' key is not there
  res
    .status(200)
    .json({ status: "success", results: tours.length, data: { tours } });
});

app.post("/api/v1/tours", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
