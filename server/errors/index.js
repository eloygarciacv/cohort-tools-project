function handleErrors(app) {

  // Error Handling
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use((error, req, res, next) => {
    // because this has 4 parameters, express knows that this is the 500 main error handler
    console.log(error);
    res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: error,
    });
  });

}

module.exports = handleErrors