import app from "./app.js";

const port = process.env.PORT || 3000;
// console.log(app.get("env"));

// Start Server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
