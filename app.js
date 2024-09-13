import express from "express";
const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
    // By using .json, it would set the content type to "application/json
  res.status(200).json({ message: "Hello from server", app: "Olamarx App" });
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
