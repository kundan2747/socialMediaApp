require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsConfig");
const mongoose = require("mongoose");
const connectDb = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const verifyJWT = require("./middleware/verifyJWT");
const { createPost } = require("./controller/postController");

// middlewares
connectDb();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors(corsOptions));
// app.use(cors());
app.use(cookieParser());
app.use("/", express.static("./public"));
app.use("/", require("./routes/root"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.post("/posts", verifyJWT, upload.single("image"), createPost);
// app.post("/posts", createPost);

app.use("/users", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/posts", require("./routes/postRoute"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
