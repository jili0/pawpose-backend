export const pathErrorHandler = (_req, res) => {
  res.status(404).json({
    error: "NotFound",
    message:
      "The requested resource could not be found. Please check whether the path is correct.",
  });
};
