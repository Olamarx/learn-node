import Tour from "../models/tourModel.js";

// created the __dirname since it is not in type module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../assets/tours-simple.json`)
// );

const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const getTour = async (req, res) => {
  //   Jsend formats to send data, but the 'results' key is not there
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({ status: "success", data: { tour } });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
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

const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Tour updated successfully",
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      message: "Tour deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

export { getTours, getTour, createTour, updateTour, deleteTour };
