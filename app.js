const path = require("path");

//create express app
const express = require("express");

const app = express();
const cors = require("cors");
const compression = require("compression");

app.use(cors());
app.options("*", cors());
app.use(compression());

//config environment
require("dotenv").config();

//logger request
const morgan = require("morgan");

//ApiError handler
const ApiError = require("./utils/ApiError");

//global Error Handling
const globalError = require("./middlewares/error_middlwares");

//routes
const routes = require("./routes");
const { webHookHandler } = require("./services/orderServices");

//db coonection
const dbConnection = require("./config/database");

dbConnection();

//parse body
app.use(express.json());
//serve static files
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "devolopment") {
  app.use(morgan("dev"));
}

//mount routes
routes(app);
app.post(
  "/webhock-checkout",
  express.raw({ type: "application/json" }),
  webHookHandler
);

// handling unexist route
app.all("*", (req, res, next) => {
  next(new ApiError(`can't found this route: ${req.originalUrl}`, 400));
});

//global express error handling for express
app.use(globalError);

const server = app.listen(process.env.port || 3000, () =>
  console.log(`app running in ${process.env.NODE_ENV} `)
);

//handling rjection out express
//listen for unhandledRejection such DB conn or validation

process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection ${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`server closed ...`);
    process.exit(1);
  });
});
