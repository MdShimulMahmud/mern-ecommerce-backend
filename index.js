const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
// database connection
dbConnect();

// routing setup
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
