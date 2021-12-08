const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteRoutes");
const path = require("path");
const cors = require("cors");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3080;
const app = express();

dotenv.config();

mongoose
  .connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors());

app.use("/api/notes", noteRoutes);

app.use("/api/user", authRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
