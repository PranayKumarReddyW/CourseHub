const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(express.json());
const CLIENT_URL = process.env.CLIENT_URL;
app.use(
  cors({
    origins: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

require("./config/db")
  .connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  });

// routes config
app.use("/auth", require("./routes/authRoutes"));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});
