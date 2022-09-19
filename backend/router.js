const employeeRoute = require("./routes/employee-route");

module.exports.router = (app) => {
  app.use("/api/employee", employeeRoute);
  app.use((req, res, next) => {
    res.status(404);
    res.json({
      message: "Route not found",
    });
  });
};