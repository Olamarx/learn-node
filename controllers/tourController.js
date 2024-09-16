import Tour from "../models/tourModel.js";

// created the __dirname since it is not in type module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../assets/tours-simple.json`)
// );


const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: "fail", message: "Please provide name and price" });
  }
  next();
};

const getTours = (req, res) => {
  console.log(req.requestTime);

  //   Jsend formats to send data, but the 'results' key is not there
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: { tours },
  });
};

const getTour = (req, res) => {
  //   Jsend formats to send data, but the 'results' key is not there
  const id = parseInt(req.params.id);
  // const tour = tours.find((tour) => tour.id === id);
  // res.status(200).json({ status: "success", data: { tour } });
};

const createTour = (req, res) => {
  res.status(201).json({ status: "success", 
    // data: {tour: newTour} 
  });
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Tour updated successfully",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    message: "Tour deleted successfully",
    data: null,
  });
};

export {
  checkBody,
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
