require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db.config");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Pragma",
      "Expires",
    ],
    credentials: true,
  })
);

app.use("/api", require("./router/app.route"));

connectDb();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
