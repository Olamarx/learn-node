import mongoose from "mongoose";
import app from "./app.js";

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
  });
 
// Start Server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
