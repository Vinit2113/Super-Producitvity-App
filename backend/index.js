const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = process.env.PORT;

const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const connDB = require("./db/dbconn");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend port
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use("/user/", userRoutes);
app.use("/task/", taskRoutes);

connDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
