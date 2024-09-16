import Tour from "../models/tourModel.js";

// created the __dirname since it is not in type module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../assets/tours-simple.json`)
// );

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

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
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

export { getTours, getTour, createTour, updateTour, deleteTour };
