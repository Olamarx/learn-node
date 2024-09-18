import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
// console.log(app.get("env"));
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection established");
  })
  .catch((error) => {
    console.log("Connection error details:", error.message);
  });

// Start Server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
