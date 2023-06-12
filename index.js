const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
// database connection
dbConnect();

// routing setup

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/users", authRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// client side error
// app.use((req, res, next) => {
//   res.status(404).json({
//     message: "Client Side Error!",
//   });
// });

// // server side error
// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: "Server side error!",
//     error: err.message,
//   });
// });

// listening to server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
