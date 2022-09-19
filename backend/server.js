const express = require("express");
const db_connection = require("./db/db_connection");
const { config } = require("./config"); 
const { corsControl } = require("./cors"); 
const { router } = require("./router");
const app = express();

//* Setup middlewares *//
config(app);

//* Setup cors *//
corsControl(app);

//* routes *//
router(app);

//* Error handler *//
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    data: err.data,
    message: errorMessage,
    stack: err.stack,
  });
});

//* Run server *//
app.listen(process.env.PORT || 5000, () => {
  //* MongoDB connection *//
  db_connection();
  console.log("Listening ");
});
