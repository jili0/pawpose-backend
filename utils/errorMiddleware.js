export const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({
      error: err.name || "UnknownError",
      message: err.message || "There is an error",
    });
  }
  console.log(err);
  res.status(500).json({ error: "InternalServerError", message: err.message });
};
