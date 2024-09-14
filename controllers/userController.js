const getUsers = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined" });
};

const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined" });
};

const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined" });
};

const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined" });
};

const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not defined" });
};

export { deleteUser, createUser, updateUser, getUser, getUsers };
