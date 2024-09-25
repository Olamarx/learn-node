import Tour from "../models/tourModel.js";
import APIFeatures from "../utils/apiFeatures.js";

const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingAverage,price";
  req.query.fields = "name,summary,duration,difficulty,price,ratingAverage";
  next();
};

const getTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE TO
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

const getTourStats = async (req, res) => {
  try {
    const stats = Tour.aggregate({
      
    })
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

export { getTours, getTour, createTour, updateTour, deleteTour, aliasTopTours };
